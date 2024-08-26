import {
  Bookmark,
  BookmarkMinus,
  ChevronDown,
  ChevronUp,
  Download,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Document, Page, pdfjs } from "react-pdf";
import { saveAs } from "file-saver";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "../lib/utils";
import Loader from "./loader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ActionTooltip } from "./ActionTooltip";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfRendererProps {
  url: string;
}
interface BookMark {
  pdfId: number;
  pageNo: number;
  //   pdfTitle: string;
}
const PdfRenderer = ({ url }: PdfRendererProps) => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  let pageNumber = Number(searchParams.get("pageNo")) || 1;
  const containerRef = useRef<HTMLDivElement>(null);

  let cachedBookmarks: BookMark[] = JSON.parse(
    localStorage.getItem("zucol-bookmarks") || "[]"
  );

  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(pageNumber);
  const [scale, setScale] = useState<number>(1);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useState(cachedBookmarks);
  const isLoading = renderedScale !== scale;

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!, {
        message: "Page number out of range",
      }),
  });

  const toggleBookmark = (page: number) => {
    setBookmarks((obj) => {
      let prev = [...obj];
      const isAlreadyBookmarked = prev.findIndex(
        (item) => item.pageNo === page && item.pdfId === Number(id)
      );
      console.log(isAlreadyBookmarked);
      // If not Bookmarked
      if (isAlreadyBookmarked === -1) {
        prev.push({
          pageNo: page,
          pdfId: Number(id),
        });
        toast("Added to Bookmark");
      } else {
        prev = prev.filter(
          (item) => !(item.pageNo === page && item.pdfId === Number(id))
        );
        toast("Removed from Bookmark");
      }
      localStorage.setItem("zucol-bookmarks", JSON.stringify(prev));
      return prev;
    });
  };

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: String(currPage),
    },
    resolver: zodResolver(CustomPageValidator),
  });

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    const pageNumber = Number(page);
    if (pageNumber <= numPages!) {
      setCurrPage(pageNumber);
      setValue("page", String(pageNumber));
      //   scrollToPage(pageNumber);
    }
  };
  const handleDownload = () => {
    saveAs(url, "document.pdf");
  };
  const scrollToPage = (page: number) => {
    if (containerRef.current) {
      const currentPageElement = containerRef.current.querySelector(
        `.react-pdf__Page[data-page-number="${page}"]`
      );
      currentPageElement?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
  };
  useEffect(() => {
    if (!isLoading) {
      scrollToPage(currPage);
    }
  }, [currPage, pageNumber, isLoading]);

  useEffect(() => {
    if (numPages && currPage > numPages) {
      setCurrPage(numPages);
      navigate(`?pageNo=${numPages}`, { replace: true });
    } else {
      navigate(`?pageNo=${currPage}`, { replace: true });
    }
  }, [currPage, numPages, navigate]);

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.25, 0.5));
  };
  const isAlreadyBookmarked = bookmarks.some(
    (item) => item.pageNo === currPage && item.pdfId === Number(id)
  );
  // Comment this then Our Zoom In / Zoom Out will work perfectly as they are supposed to work
  useEffect(() => {
    const handleScroll = () => {
      const pageElements =
        containerRef.current?.querySelectorAll(".react-pdf__Page");
      if (pageElements) {
        for (let i = 0; i < pageElements.length; i++) {
          const pageElement = pageElements[i];
          const rect = pageElement.getBoundingClientRect();
          if (rect.y >= 0 && rect.top >= 0 && rect.top <= window.innerHeight) {
            setCurrPage(i + 1);
            console.log("In here", i);
            setValue("page", String(i + 1));
            break;
          }
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            setCurrPage(i + 1);
            setValue("page", String(i + 1));
            break;
          }
        }
      }
    };
    window?.addEventListener("scroll", handleScroll);
    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full bg-white relative rounded-md shadow flex flex-col items-center">
      <div className="h-14 border-b fixed bottom-5 z-10 bg-[#4a4dc7] rounded-full text-white border-zinc-200 flex items-center justify-between px-5 gap-x-2">
        <div className="flex items-center text-[#4a4dc7] gap-2">
          <ActionTooltip label="Prev Page" align="center" side="top">
            <Button
              disabled={currPage <= 1}
              onClick={() => {
                setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
                setValue("page", String(currPage - 1));
              }}
              variant="ghost"
              className="bg-white text-black rounded-full p-2 h-fit"
              aria-label="previous page">
              <ChevronUp className="h-4 w-4" />
            </Button>
          </ActionTooltip>
          <div className="flex items-center h-fit gap-1 bg-white rounded-full px-3 py-2 font-bold text-xs">
            <Input
              {...register("page")}
              className={cn(
                "w-4 border-0 text-xs h-fit text-center p-0 m-0 bg-transparent",
                errors.page && "focus-visible:ring-red-500"
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)();
                }
              }}
            />
            <p className="space-x-1">
              <span>Out Of</span>
              <span>{numPages ?? "x"}</span>
            </p>
          </div>
          <ActionTooltip label="Next Page" align="center" side="top">
            <Button
              disabled={numPages === undefined || currPage === numPages}
              onClick={() => {
                setCurrPage((prev) =>
                  prev + 1 > numPages! ? numPages! : prev + 1
                );
                setValue("page", String(currPage + 1));
              }}
              variant="ghost"
              className="bg-white rounded-full p-2 h-fit"
              aria-label="next page">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </ActionTooltip>
        </div>
        <button
          onClick={() => toggleBookmark(currPage)}
          aria-label="bookmark page">
          {isAlreadyBookmarked ? (
            <ActionTooltip
              label="Remove From Bookmark"
              align="center"
              side="top">
              <BookmarkMinus />
            </ActionTooltip>
          ) : (
            <ActionTooltip label="Add To Bookmark" align="center" side="top">
              <Bookmark />
            </ActionTooltip>
          )}
        </button>
        <div className="flex items-center gap-x-2">
          <div className="hidden md:flex px-2 border-white h-5 border-[3px] border-y-0 items-center gap-x-2">
            <ActionTooltip label="Zoom In" align="center" side="top">
              <button
                onClick={handleZoomIn}
                disabled={scale >= 2.5}
                className={cn("", scale >= 2.5 && "opacity-30")}>
                <ZoomIn />
              </button>
            </ActionTooltip>
            <ActionTooltip label="Zoom Out" align="center" side="top">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                className={cn("", scale <= 0.5 && "opacity-30")}>
                <ZoomOut />
              </button>
            </ActionTooltip>
          </div>
          <div>
            <ActionTooltip label="Download Pdf" align="center" side="top">
              <Button
                variant="ghost"
                onClick={handleDownload}
                className="bg-white text-[#4a4dc7] rounded-full py-2 px-4 h-fit"
                aria-label="download">
                <Download className="h-4 w-4" /> Download
              </Button>
            </ActionTooltip>
          </div>
        </div>
      </div>
      <div className="max-h-screen">
        <div ref={containerRef}>
          <Document
            loading={<Loader />}
            onLoadError={() => {
              toast("Error loading PDF", {
                description: "Please try again later",
              });
            }}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            file={url}
            className="max-h-full bg-gray-200">
            {Array.from(new Array(numPages), (_: any, index) => (
              <div
                key={`page_${index + 1}`}
                className={cn(
                  "relative m-10 rounded-xl",
                  isLoading ? "border-0" : "border-[1px] border-zinc-700",
                  scale <= 1 ? "overflow-hidden" : "overflow-scroll"
                )}>
                <Page
                  className={cn(isLoading ? "hidden" : "")}
                  width={window.innerWidth - 2 * 50}
                  pageNumber={index + 1}
                  scale={scale}
                  loading={<Loader />}
                  onRenderSuccess={() => setRenderedScale(scale)}
                  data-page-number={index + 1}
                />
                <p className="absolute right-0 top-0 w-10 h-10 border-2 rounded bg-[#4a4dc7] text-white flex justify-center items-center">
                  <span>{index + 1}</span>
                </p>
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
