import { pfdArray } from "../lib/schema";
import Card from "./card";

const Body = () => {
  return (
    <div className="main-component grid grid-cols-3 gap-5 justify-between items-center">
      {pfdArray.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default Body;
