import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { ChoiceItem } from "../../home";
import css from "./drawInterface.module.css";

type DrawInterfaceProps = {
  choiceItem: ChoiceItem;
  choiceColor: string;
};

// 색깔과 칩이냐 그거냐에 따라 다른 함수를 써야해. 걍 깡으로 함수 5개 만들고 공통된 거 알아서 통합 ㄱㄱ
// chanceValue = 몇뽑
// winValue = 몇번 나오는가
// 골코먼저
function DrawInterface({ choiceItem, choiceColor }: DrawInterfaceProps) {
  const [chanceValue, setChanceValue] = useState<number | "">("");
  const [winValue, setWinValue] = useState<number | "">("");

  const handleInputChange =
    (setter: Dispatch<SetStateAction<number | "">>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (
        value === "" ||
        (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) < 1000)
      ) {
        setter(value === "" ? "" : Number(value));
      }

      if (!isNaN(Number(value)) && Number(value) >= 1000) {
        setter(Number(999));
      }
    };

  return (
    <div className={css.drawInterface}>
      <input
        type="number"
        onChange={handleInputChange(setChanceValue)}
        value={chanceValue}
        min="0"
        placeholder="chance"
      />
      <input
        type="number"
        onChange={handleInputChange(setWinValue)}
        value={winValue}
        min="0"
        placeholder="win"
      />
      <p>probability:</p>
      <button className={css.drawInterface_Button}>start!</button>
    </div>
  );
}

export default DrawInterface;
