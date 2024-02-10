import { FC, useState } from "react";
import { ICard } from "./Board";
import { cn } from "../utils";
import { Grab, Trash2 } from "lucide-react";

interface DeleteCardProps {
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
}

const DeleteCard: FC<DeleteCardProps> = ({ setCards }) => {
  const [active, setActive] = useState(false);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    setCards((prev) => prev.filter((card) => card.id !== cardId));
    setActive(false);
  };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl",
        {
          "bg-red-800/20 border-red-800 text-red-500": active,
          "bg-neutral-500/20 border-neutral-500 text-neutral-500": !active,
        }
      )}
    >
      {active ? <Grab className="animate-bounce" /> : <Trash2 />}
    </div>
  );
};

export default DeleteCard;
