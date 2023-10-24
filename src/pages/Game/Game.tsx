import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//images
import bomber from "../../images/img-game/Bomb.svg.png";
import smileNotRight from "../../images/img-game/smile-sad.png";
import bomb from "../../images/img-game/Bomb.svg.png";
//Components
import Button from "../../Components/Button";
//redux state
import { RootState } from "../../redux/store";
//reducer
import { makeMove } from "../../redux/store/gameReducer";

//style
import style from "./style.module.scss";
const Game = () => {
  
  const dispatch = useDispatch();
  const [isNotMines, setIsNotMines] = useState<boolean>(true);
  const [isMines, setIsisMines] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [redirect, setRedirect] = useState<boolean>(false);

  const ourGame = useSelector((state: RootState) => state.toolkit.arrOfItems).flat();
  console.log(ourGame)
  

  const countToWin = ourGame.filter(
    (it: { type: number }) => it.type === 0
  ).length;

  function checkMines(type: number, index: number) {
    if (type === 1) {
      setIsNotMines(false);
      setIsisMines(true);

      setTimeout(() => {
        setRedirect(true);
      }, 1000);
    }
    if (type === 0) {
      setIsNotMines(true);
      setIsisMines(true);
      setCounter((counter) => (counter += 1));
      setIndex(index);
    }
  }
  useEffect(() => {
    if (isMines && isNotMines) {
      dispatch(makeMove(index));
    }
  }, [isMines, isNotMines, dispatch, index]);

  return (
    <div className={style.box}>
      <div className={style.boxForGame}>
        <div className={style.tittle}>
          <img className={style.bomb} src={bomber} alt="mines" />
          <h1>MinesWeeper</h1>
        </div>
        <div className={style.tableScoreAndResult}>
          <div className={style.weeperCount}>
            кількість кроків до перемоги {counter}/{countToWin}
          </div>
          <div className={style.smiles}>
            <img
              src={!isNotMines ? (isMines ? smileNotRight : "") : ""}
              alt=""
            />
          </div>
        </div>
        <div className={style.weeperTable}>
          {ourGame.length === 0 ? (
            <div>
              <Button
                styles={style.toMainPageBtn}
                value="Ви втратили свій прогрес ,перейдіть до головного меню"
                to="*"
                onClick={(any) => any}
              />
            </div>
          ) : (
            ourGame.map((it: { type: number; value: boolean }, i: number) => {
              return (
                <div
                  key={i}
                  className={it.value === true ? style.active : style.curIt}
                  onClick={() => checkMines(it.type, i)}
                >
                  <img
                    className={style.bomb}
                    src={!isNotMines ? (it.type === 1 ? bomb : "") : ""}
                    alt=""
                  />
                </div>
              );
            })
          )}
        </div>
        {redirect ? <Navigate replace={true} to="/menu" /> : null}
      </div>
    </div>
  );
};

export default Game;
