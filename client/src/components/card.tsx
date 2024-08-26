import { Link } from "react-router-dom";
import { PdfSchema } from "../lib/schema";
import { Eye, StickyNote } from "lucide-react";

interface Props {
  card: PdfSchema;
}
// Function to truncate the description to 100 words
const truncateDescription = (description: string, length: number = 10) => {
  const words = description.split(" ");
  if (words.length > length) {
    return words.slice(0, length).join(" ") + "...";
  }
  return description;
};

const Card = ({ card }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-xs">
      <div className="bg-gray-300 text-[7px] py-2 px-5">
        {truncateDescription(card.description, 100)}
      </div>
      <div className="bg-white px-4 pb-6 gap-y-3 flex flex-col">
        <div className="flex justify-between items-center pt-2">
          <p className="text-md font-semibold">{card.name}</p>
          {card.pageNo && (
            <p className="text-xs font-bold text-[#4a4dc7]">
              Page No.: {card.pageNo}
            </p>
          )}
        </div>
        <p className="text-sm text-pretty">
          {truncateDescription(card.description, 6)}
        </p>
        <div className="flex justify-around">
          <p className="rounded-full w-fit py-2 px-4 flex items-center text-xs gap-x-1.5 bg-[#4a4dc725]">
            <StickyNote className="w-4 h-4 bg-transparent border-l-2" />
            <span className="h-3 border-[1px] border-gray-400" />
            {card.pages}
          </p>
          <p className="rounded-full w-fit py-2 px-4 flex items-center text-xs gap-x-1.5 bg-[#4a4dc725]">
            <Eye className="w-4 h-4 bg-transparent border-l-2" />
            <span className="h-3 border-[1px] border-gray-400" />
            {card.viewed}
          </p>
        </div>
        <Link to={`/${card.id}?pageNo=${card.pageNo || 1}`}>
          <button
            className="bg-[#4a4dc7] text-white text-sm w-full rounded-full py-2 h-fit"
            aria-label="view-document">
            View document
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
