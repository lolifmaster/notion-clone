import { FC, useState } from "react";
import { ICard } from "./Board";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface AddCardProps {
  column: string;
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
}

const AddCard: FC<AddCardProps> = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() === "") return;
    const newCard: ICard = {
      column,
      id: Date.now().toString(),
      title: text.trim(),
    };
    setCards((cards) => [...cards, newCard]);
    setText("");
    setAdding(false);
  };
  return (
    <>
      {adding ? (
        <motion.form onSubmit={onSubmit} layout>
          <textarea
            placeholder="Add new task..."
            autoFocus
            onChange={(e) => setText(e.target.value)}
            className="w-full resize-none rounded border border-violet-400 bg-violet-200/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus-within:outline-0"
          />
          <div className="mt-1.5 font-medium flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex rounded items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-950 bg-neutral-50 transition-colors hover:text-neutral-300"
            >
              Add <Plus size={13} />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          Add a card <Plus />
        </motion.button>
      )}
    </>
  );
};

export default AddCard;
