import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
//interface
import { CurGameTypes } from "interface";
//components
import Input from "сomponents/Input";
import Button from "сomponents/Button";
//helpers
import { checkValueFromInputs, CheckDataToGame } from "helpers";
//style
import style from "./style.module.scss";

const CreateLevel = () => {
  const dispatch = useDispatch();
  const [dataToCreateGame, setDataToCreateGame] = useState<CurGameTypes>({
    countOfEmptyLines: "",
    countOfMines: "",
  });
  const navigate = useNavigate();
  const [inputIsEmpty, setInputIsEmpty] = useState(false);
  

  function checkAllInput(inputData: CurGameTypes): void {
    if (
      !checkValueFromInputs(inputData.countOfEmptyLines, inputData.countOfMines)
    ) {
      setInputIsEmpty(true);
      return;
    }
    setInputIsEmpty(false);
    CheckDataToGame(dispatch, dataToCreateGame);
    navigate("/startGame");
  }
  useEffect(() => {
    setTimeout(() => {
      setInputIsEmpty(false);
    }, 3000);
  }, [inputIsEmpty, navigate]);

  return (
    <div className={style.box}>
      <Input
        type="input"
        styles={clsx({
          [style.isNotValue]: inputIsEmpty,
        })}
        placeholder={ "Size of Game" }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDataToCreateGame({
            ...dataToCreateGame,
            countOfEmptyLines: e.target.value,
          });
        }}
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
