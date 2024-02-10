/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import DropIndicator from "./DropIndicator";
import { ICard } from "./Board";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  id: string;
  column: string;
  startDrag: (e: any, card: ICard) => void;
}

const Card: FC<CardProps> = ({ column, id, title, startDrag }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable
        onDragStart={(e) => startDrag(e, { id, title, column })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
};

export default Card;
