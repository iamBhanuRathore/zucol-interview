import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  className?: string;
}

const Loader: React.FC<Props> = ({ className, size = 30, ...rest }) => {
  return (
    <div
      className={cn("flex justify-center items-center", className)}
      {...rest}>
      <Loader2 size={size} className="my-24 animate-spin" />
    </div>
  );
};

export default Loader;
