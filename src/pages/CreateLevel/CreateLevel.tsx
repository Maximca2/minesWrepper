import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
//interface
import { CurGameData } from "interface";
//components
import Input from "сomponents/Input";
import Button from "сomponents/Button";
//helpers
import { checkValueFromInputs, sendData } from "helpers";
//style
import style from "./style.module.scss";

const CreateLevel = () => {
  const dispatch = useDispatch();
  const [dataToCreateGame, setDataToCreateGame] = useState<CurGameData>({
    countOfEmptyLines: "",
    countOfMines: "",
  });
  const navigate = useNavigate();
  const [inputIsEmpty, setInputIsEmpty] = useState(false);
  const [dataIs, setDataIs] = useState<boolean>(false);

  function checkAllInput(inputData: CurGameData): void {
    if (
      !checkValueFromInputs(inputData.countOfEmptyLines, inputData.countOfMines)
    ) {
      setDataIs(false);
      setInputIsEmpty(true);
      return;
    }
    setDataIs(true);
    setInputIsEmpty(false);
    sendData(dispatch, dataToCreateGame);
  }
  useEffect(() => {
    setTimeout(() => {
      setInputIsEmpty(false);
    }, 3000);

    if (dataIs) {
      navigate("/startGame");
    }
  }, [dataIs, inputIsEmpty, navigate]);

  return (
    <div className={style.box}>
      <Input
        type="input"
        styles={clsx({
          [style.isNotValue]: inputIsEmpty,
        })}
        placeholder={!dataIs ? "Size of Game" : ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDataToCreateGame({
            ...dataToCreateGame,
            countOfEmptyLines: e.target.value,
          });
        }}
        id={""}
      ></Input>
      <Input
        type="input"
        styles={clsx({
          [style.isNotValue]: inputIsEmpty,
        })}
        placeholder="Count of Mines "
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDataToCreateGame({
            ...dataToCreateGame,
            countOfMines: e.target.value,
          });
        }}
        id={""}
      ></Input>
      <Button
        styles={style.createGame}
        value={"Next"}
        to=""
        onClick={() => checkAllInput(dataToCreateGame)}
      />
    </div>
  );
};

export default CreateLevel;
