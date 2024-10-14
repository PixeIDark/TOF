import { useState } from "react";
import { Nav } from "./components/Nav";
import css from "./home.module.css";
import { SupportNav } from "./components/SupportNav";
import { DrawInterface } from "./components/DrawInterface";

export type ChoiceItem = "weapon" | "chip";

function Home() {
  const [choiceItem, setChoiceItem] = useState<ChoiceItem>("weapon");
  const [choiceColor, setChoiceColor] = useState<string>("");

  return (
    <div className={css.body}>
      <div className={css.center}>
        <Nav choiceItem={choiceItem} setChoiceItem={setChoiceItem} />
        <SupportNav
          choiceItem={choiceItem}
          choiceColor={choiceColor}
          setChoiceColor={setChoiceColor}
        />
        <DrawInterface choiceItem={choiceItem} choiceColor={choiceColor} />
      </div>
    </div>
  );
}

export default Home;
