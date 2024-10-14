import { Dispatch, SetStateAction } from "react";
import { ChoiceItem } from "../../home";
import css from "./nav.module.css";

type NavProps = {
  choiceItem: ChoiceItem;
  setChoiceItem: Dispatch<SetStateAction<ChoiceItem>>;
};

// 사진도 넣어라.
function Nav({ choiceItem, setChoiceItem }: NavProps) {
  const handleSelectItem = (type: ChoiceItem): void => {
    setChoiceItem(type);
  };

  return (
    <div className={css.nav}>
      <button
        className={css.weapon}
        style={choiceItem === "weapon" ? { border: "2px solid white" } : {}}
        onClick={() => handleSelectItem("weapon")}
      >
        weapon
      </button>
      <button
        className={css.chip}
        style={choiceItem === "chip" ? { border: "2px solid white" } : {}}
        onClick={() => handleSelectItem("chip")}
      >
        chip
      </button>
    </div>
  );
}

export default Nav;
