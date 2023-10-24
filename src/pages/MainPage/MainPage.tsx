import React from "react";
import { useDispatch } from "react-redux";
//Components
import Button from "../../Components/Button";
//Reducer
import { createNewGame } from "../../redux/store/gameReducer";
//style
import style from "../MainPage/style.module.scss";

const MainPage = () => {

  const dispatch = useDispatch();

  function createGame() {
    const oursArrToGame = Array.from({ length: 180 }, () => {
      let length = 2;
      return { type: Math.floor(Math.random() * length), value: false };
    });
    dispatch(createNewGame(oursArrToGame));
  }

  return (
    <div>
      <div className={style.box}>
        <div className={style.tittle}>MinesWeeper</div>
        <Button
          styles={style.btnStart}
          value="Розпочати гру"
          to="/startGame"
          onClick={() => createGame()}
        />
      </div>
    </div>
  );
};

export default MainPage;
