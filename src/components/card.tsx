import { Link } from "react-router-dom";
import { PdfSchema } from "../lib/schema";

interface Props {
  card: PdfSchema;
}

const Card = ({ card }: Props) => {
  return (
    <div>
      <p>{card.name}</p>
      <Link to={`/${card.id}`}>
        <p>Preview</p>
      </Link>
    </div>
  );
};

export default Card;
