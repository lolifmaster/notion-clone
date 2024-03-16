/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { FC } from "react";

interface CardProps {
  title: string;
  id: string;
  startDrag: (e: any, id: string) => void;
}

const Card: FC<CardProps> = ({ id, title, startDrag }) => {
  return (
    <motion.div
      layout
      layoutId={id}
      draggable
      onDragStart={(e) => startDrag(e, id)}
      className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
    >
      <p className="text-sm text-neutral-100">{title}</p>
    </motion.div>
  );
};

export default Card;
