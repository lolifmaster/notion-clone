import { FC } from "react";

interface DropIndicatorProps {
  beforeId?: string;
  column: string;
}

const DropIndicator: FC<DropIndicatorProps> = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    ></div>
  );
};

export default DropIndicator;
