import { FC, useCallback, useMemo, useState } from "react";
import { cn } from "../utils";
import { ICard } from "./Board";
import Card from "./Card";
import DropIndicator from "./DropIndicator";
import AddCard from "./AddCard";

interface ColumnProps {
  title: string;
  column: string;
  cards: ICard[];
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  headingColor?: string;
}

const Column: FC<ColumnProps> = ({
  cards,
  column,
  setCards,
  title,
  headingColor = "text-cyan-300",
}) => {
  const [active, setActive] = useState(false);

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: string) => {
      e.dataTransfer.setData("cardId", id);
    },
    []
  );

  const getIndicators = useCallback(() => {
    return Array.from(document.querySelectorAll(`[data-column=${column}]`));
  }, [column]);

  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: Element[]
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const clearIndicators = useCallback(
    (els?: Element[]) => {
      const indicators = els || getIndicators();
      indicators.forEach((indicator) => {
        (indicator as HTMLElement).style.opacity = "0";
      });
    },
    [getIndicators]
  );

  const highlightIndicator = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      const indicators = getIndicators();
      clearIndicators();
      const nearest = getNearestIndicator(e, indicators);
      (nearest.element as HTMLElement).style.opacity = "1";
    },
    [getIndicators, clearIndicators]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const handleDragLeave = () => {
    clearIndicators();
    setActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearIndicators();
    setActive(false);
    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();

    const nearest = getNearestIndicator(e, indicators);
    const element = nearest.element as HTMLElement;

    const beforeId = element.dataset.before || "-1";

    if (beforeId === cardId) return;

    setCards((prev) => {
      const copy = [...prev];
      const cardToTransfer = copy.find((c) => c.id === cardId) as ICard;
      cardToTransfer.column = column;
      copy.splice(copy.indexOf(cardToTransfer), 1);
      const moveToBack = beforeId === "-1";
      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === beforeId);
        if (insertAtIndex === undefined) return prev;
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      return copy;
    });
  };

  const filteredCards = useMemo(
    () => cards.filter((card) => card.column === column),
    [cards, column]
  );

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={cn("font-medium", headingColor)}>{title}</h3>
        <span className="text-neutral-400">{filteredCards.length}</span>
      </div>
      <div
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn("h-full w-full transition-colors", {
          "bg-neutral-800/50": active,
          "bg-neutral-800/0": !active,
        })}
      >
        {filteredCards.map((card) => (
          <>
            <DropIndicator beforeId={card.id} column={column} />
            <Card key={card.id} {...card} startDrag={handleDragStart} />
          </>
        ))}
        <DropIndicator column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

export default Column;
