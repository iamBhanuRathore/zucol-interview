import Card from "./card";
import { PdfSchema } from "../lib/schema";
import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
const Body = () => {
  const [data, setData] = useState<PdfSchema[] | null>(null);
  const [bookmarks, setBookmarks] = useState<PdfSchema[] | []>([]);
  const cachedBookmarks = JSON.parse(
    localStorage.getItem("zucol-bookmarks") || "[]"
  );
  console.log(cachedBookmarks);
  const resetBookMarks = (values: PdfSchema[]) => {
    let newBookMarkArray: PdfSchema[] = [];
    values.forEach((item) => {
      cachedBookmarks.forEach((element: any) => {
        if (element.pdfId === item.id) {
          newBookMarkArray.push({
            id: item.id,
            name: item.name,
            url: item.url,
            pageNo: element.pageNo,
            description: item.description,
            pages: item.pages,
            viewed: item.viewed,
          });
        }
      });
    });
    setBookmarks(newBookMarkArray);
  };
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:3000/pdfs");
      resetBookMarks(data);
      setData(data);
    })();
  }, []);
  return (
    <section className="md:w-3/4 mx-auto bg-gray-100">
      {/* Header */}
      <div className="shadow-lg w-full px-5 border-b-[1px] border-black py-3 mb-10">
        <h1 className="txt-3xl text-[#4a4dc7] font-bold">
          Search Study Resources
        </h1>
        <h1 className="text-xs">
          Find Solved Assignments acedemic reports, presentation
          dissertations,class notesand more
        </h1>
      </div>
      {/* SearchBar */}
      <div className="px-5 mb-10 md:px-10">
        <p className="flex bg-white w-3/4 mx-auto md:mx-0 h-8 pl-4 rounded-lg border-[1px] border-gray-400 items-center">
          <input
            type="text"
            className="flex-1 focus:ring-0 focus:border-0 focus:outline-0 placeholder:text-gray-400"
            placeholder="Search for assignments samples and resources"
          />
          <Search className="w-4 h-6 mr-2 text-gray-700 border-l-[1px] border-l-gray-400" />
        </p>
      </div>
      <div className="main-component grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center md:justify-between  px-5 md:px-10">
        {data?.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
      <div className="py-10 px-5 md:px-10">
        <h2 className="text-2xl shadow-lg w-full px-5 border-x-2 border-black py-3 mb-8">
          Bookmarks Pdf
        </h2>
        <div className="main-component grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center md:justify-between items-center">
          {bookmarks.map((element: any, index: number) => (
            <Card key={index} card={element} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Body;
