// "use client";

// import {
//   ChevronDown,
//   ChevronUp,
//   Download,
//   Loader2,
//   RotateCw,
//   Search,
//   ZoomIn,
//   ZoomOut,
// } from "lucide-react";
// import { Document, Page, pdfjs } from "react-pdf";

// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";
// import { useToast } from "./ui/use-toast";

// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Fragment, useEffect, useRef, useState } from "react";

// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";

// import SimpleBar from "simplebar-react";
// import { cn } from "../lib/utils";
// import PdfFullscreen from "./PdfFullScreen";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

// interface PdfRendererProps {
//   url: string;
// }

// const PdfRenderer = ({ url }: PdfRendererProps) => {
//   const { toast } = useToast();
//   const containerRef = useRef<HTMLDivElement>(null);

//   const [numPages, setNumPages] = useState<number>();
//   const [currPage, setCurrPage] = useState<number>(1);
//   const [scale, setScale] = useState<number>(1);
//   const [rotation, setRotation] = useState<number>(0);
//   const [renderedScale, setRenderedScale] = useState<number | null>(null);

//   const isLoading = renderedScale !== scale;

//   const CustomPageValidator = z.object({
//     page: z
//       .string()
//       .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
//   });

//   type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm<TCustomPageValidator>({
//     defaultValues: {
//       page: "1",
//     },
//     resolver: zodResolver(CustomPageValidator),
//   });

//   const handlePageSubmit = ({ page }: TCustomPageValidator) => {
//     setCurrPage(Number(page));
//     setValue("page", String(page));
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const pageElements =
//         containerRef.current?.querySelectorAll(".react-pdf__Page");

//       if (pageElements) {
//         for (let i = 0; i < pageElements.length; i++) {
//           const pageElement = pageElements[i];
//           const rect = pageElement.getBoundingClientRect();
//           if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
//             setCurrPage(i + 1);
//             setValue("page", String(i + 1));
//             break;
//           }
//         }
//       }
//     };

//     const container = containerRef.current;
//     container?.addEventListener("scroll", handleScroll);

//     return () => {
//       container?.removeEventListener("scroll", handleScroll);
//     };
//   }, [setValue]);
//   useEffect(() => {
//     if (containerRef.current) {
//       const currentPageElement = containerRef.current.querySelector(
//         `.react-pdf__Page[data-page-number="${currPage}"]`
//       );
//       currentPageElement?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }, [currPage]);

//   return (
//     <div className="w-full bg-white relative rounded-md shadow flex flex-col items-center">
//       <div className="h-14 border-b fixed bottom-5 z-10 bg-[#4a4dc7] rounded-full text-white border-zinc-200 flex items-center justify-between px-5 gap-x-2">
//         <div className="flex items-center text-[#4a4dc7] gap-2">
//           <Button
//             disabled={currPage <= 1}
//             onClick={() => {
//               setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
//               setValue("page", String(currPage - 1));
//             }}
//             variant="ghost"
//             className="bg-white text-black rounded-full p-2 h-fit"
//             aria-label="previous page">
//             <ChevronUp className="h-4 w-4" />
//           </Button>
//           <div className="flex items-center h-fit gap-1 bg-white rounded-full px-3 py-2 font-bold text-xs">
//             <Input
//               {...register("page")}
//               className={cn(
//                 "w-4 border-0 text-xs h-fit text-center p-0 m-0 bg-transparent",
//                 errors.page && "focus-visible:ring-red-500"
//               )}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleSubmit(handlePageSubmit)();
//                 }
//               }}
//             />
//             <p className="space-x-1">
//               <span>Out Of</span>
//               <span>{numPages ?? "x"}</span>
//             </p>
//           </div>
//           <Button
//             disabled={numPages === undefined || currPage === numPages}
//             onClick={() => {
//               setCurrPage((prev) =>
//                 prev + 1 > numPages! ? numPages! : prev + 1
//               );
//               setValue("page", String(currPage + 1));
//             }}
//             variant="ghost"
//             className="bg-white rounded-full p-2 h-fit"
//             aria-label="next page">
//             <ChevronDown className="h-4 w-4" />
//           </Button>
//         </div>

//         <div className="flex items-center gap-x-2">
//           {/* <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button className="gap-1.5" aria-label="zoom" variant="ghost">
//                 <Search className="h-4 w-4" />
//                 {scale * 100}%
//                 <ChevronDown className="h-3 w-3 opacity-50" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuItem onSelect={() => setScale(1)}>
//                 100%
//               </DropdownMenuItem>
//               <DropdownMenuItem onSelect={() => setScale(1.5)}>
//                 150%
//               </DropdownMenuItem>
//               <DropdownMenuItem onSelect={() => setScale(2)}>
//                 200%
//               </DropdownMenuItem>
//               <DropdownMenuItem onSelect={() => setScale(2.5)}>
//                 250%
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu> */}
//           <div className="hidden md:flex px-2 border-white h-5 border-[3px] border-y-0 items-center gap-x-2">
//             <button>
//               <ZoomIn />
//             </button>
//             <button>
//               <ZoomOut />
//             </button>
//           </div>
//           <div>
//             <Button
//               variant="ghost"
//               className="bg-white text-[#4a4dc7] rounded-full py-2 px-4 h-fit"
//               aria-label="next page">
//               <Download className="h-4 w-4" /> Download
//             </Button>
//           </div>
//           {/* <Button
//             onClick={() => setRotation((prev) => prev + 90)}
//             variant="ghost"
//             aria-label="rotate 90 degrees">
//             <RotateCw className="h-4 w-4" />
//           </Button> */}

//           {/* <PdfFullscreen fileUrl={url} /> */}
//         </div>
//       </div>
//       <div
//         className="flex-1 w-full max-h-screen overflow-auto"
//         ref={containerRef}>
//         <SimpleBar autoHide={false} className=" max-h-[calc(100vh-1rem)]">
//           <div>
//             <Document
//               loading={
//                 <div className="flex justify-center">
//                   <Loader2 className="my-24 h-6 w-6 animate-spin" />
//                 </div>
//               }
//               onLoadError={() => {
//                 toast({
//                   title: "Error loading PDF",
//                   description: "Please try again later",
//                   variant: "destructive",
//                 });
//               }}
//               onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//               file={url}
//               className="max-h-full">
//               {Array.from(new Array(numPages), (el, index) => (
//                 <div
//                   key={`page_${index + 1}`}
//                   className="relative m-10 border-2 border-black">
//                   <Page
//                     // key={`page_${index + 1}`}
//                     className={cn(isLoading ? "hidden" : "")}
//                     width={window.innerWidth - 2 * 50}
//                     pageNumber={index + 1}
//                     scale={scale}
//                     rotate={rotation}
//                     loading={
//                       <div className="flex justify-center">
//                         <Loader2 className="my-24 h-6 w-6 animate-spin" />
//                       </div>
//                     }
//                     onRenderSuccess={() => setRenderedScale(scale)}
//                     data-page-number={index + 1}
//                   />
//                   <p className="absolute right-0 top-0 w-10 h-10 border-2 rounded bg-[#4a4dc7] text-white flex justify-center items-center">
//                     <span>{index + 1}</span>
//                   </p>
//                 </div>
//               ))}
//             </Document>
//           </div>
//         </SimpleBar>
//       </div>
//     </div>
//   );
// };

// export default PdfRenderer;
// "use client";

import {
  ChevronDown,
  ChevronUp,
  Download,
  Loader2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { saveAs } from "file-saver"; // Add this import statement for file download

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import SimpleBar from "simplebar-react";
import { cn } from "../lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfRendererProps {
  url: string;
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);

  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  const isLoading = renderedScale !== scale;

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page));
    setValue("page", String(page));
  };
  const handleDownload = () => {
    saveAs(url, "document.pdf"); // Trigger the download with a default file name
  };

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const pageElements =
  //         containerRef.current?.querySelectorAll(".react-pdf__Page");
  //       if (pageElements) {
  //         for (let i = 0; i < pageElements.length; i++) {
  //           const pageElement = pageElements[i];
  //           const rect = pageElement.getBoundingClientRect();
  //           console.log({ rect });
  //           if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
  //             setCurrPage(i + 1);
  //             setValue("page", String(i + 1));
  //             break;
  //           }
  //         }
  //       }
  //     };

  //     const container = containerRef.current;
  //     container?.addEventListener("scroll", handleScroll);

  //     return () => {
  //       container?.removeEventListener("scroll", handleScroll);
  //     };
  //   }, [setValue]);

  useEffect(() => {
    if (containerRef.current) {
      const currentPageElement = containerRef.current.querySelector(
        `.react-pdf__Page[data-page-number="${currPage}"]`
      );
      currentPageElement?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currPage]);

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.25, 2.5)); // max zoom limit 250%
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.25, 0.5)); // min zoom limit 50%
  };

  return (
    <div className="w-full bg-white relative rounded-md shadow flex flex-col items-center">
      <div className="h-14 border-b fixed bottom-5 z-10 bg-[#4a4dc7] rounded-full text-white border-zinc-200 flex items-center justify-between px-5 gap-x-2">
        <div className="flex items-center text-[#4a4dc7] gap-2">
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
        </div>

        <div className="flex items-center gap-x-2">
          <div className="hidden md:flex px-2 border-white h-5 border-[3px] border-y-0 items-center gap-x-2">
            <button
              onClick={handleZoomIn}
              disabled={scale >= 2.5} // Disable button if max zoom is reached
              className={cn("", scale >= 2.5 && "opacity-30")}>
              <ZoomIn />
            </button>
            <button
              onClick={handleZoomOut}
              disabled={scale <= 0.5} // Disable button if min zoom is reached
              className={cn("", scale <= 0.5 && "opacity-30")}>
              <ZoomOut />
            </button>
          </div>
          <div>
            <Button
              variant="ghost"
              onClick={handleDownload} // Add the onClick handler for download
              className="bg-white text-[#4a4dc7] rounded-full py-2 px-4 h-fit"
              aria-label="next page">
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </div>
      <div
        className="flex-1 w-full max-h-screen overflow-auto"
        ref={containerRef}>
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-1rem)]">
          <div>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: "Error loading PDF",
                  description: "Please try again later",
                  variant: "destructive",
                });
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              file={url}
              className="max-h-full bg-gray-200">
              {Array.from(new Array(numPages), (_: any, index) => (
                <div
                  key={`page_${index + 1}`}
                  className={cn(
                    "relative m-10 border-2 border-black overflow-auto",
                    scale <= 1 ? "overflow-hidden" : "overflow-scroll"
                  )}>
                  <Page
                    className={cn(isLoading ? "hidden" : "")}
                    width={window.innerWidth - 2 * 50}
                    pageNumber={index + 1}
                    scale={scale}
                    loading={
                      <div className="flex justify-center">
                        <Loader2 className="my-24 h-6 w-6 animate-spin" />
                      </div>
                    }
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
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfRenderer;
