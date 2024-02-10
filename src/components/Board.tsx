import { useState } from "react";
import DEFAULT_CARDS from "../assets/data";
import Column from "./Column";
import DeleteCard from "./DeleteCard";

export type ICard = {
  title: string;
  id: string;
  column: string;
};

const Board = () => {
  const [cards, setCards] = useState<ICard[]>(DEFAULT_CARDS);

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <DeleteCard setCards={setCards} />
    </div>
  );
};

export default Board;
