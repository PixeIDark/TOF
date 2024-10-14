import css from "./supportNav.module.css";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ChoiceItem } from "../../home";

type SupportNavProps = {
  choiceItem: ChoiceItem;
  choiceColor: string;
  setChoiceColor: Dispatch<SetStateAction<string>>;
};

const selectedColor = {
  weapon: [
    ["redCore", "red"],
    ["yellowCore", "yellow"],
    ["blackCore", "black"],
  ],
  chip: [
    ["redChip", "red"],
    ["yellowChip", "yellow"],
  ],
};

// 사진 넣어라.
function SupportNav({
  choiceItem,
  choiceColor,
  setChoiceColor,
}: SupportNavProps) {
  const handleSelectColor = (color: string): void => {
    setChoiceColor(color);
  };

  useEffect(() => {
    setChoiceColor(selectedColor[choiceItem][0][0]);
  }, [choiceItem]);

  return (
    <div className={css.supportNav}>
      {selectedColor[choiceItem].map((selected) => (
        <button
          onClick={() => handleSelectColor(selected[0])}
          style={{ color: `${selected[1]}` }}
          key={selected[0]}
        >
          {selected[0]} {choiceColor === selected[0] ? "selected" : ""}
        </button>
      ))}
    </div>
  );
}

export default SupportNav;
