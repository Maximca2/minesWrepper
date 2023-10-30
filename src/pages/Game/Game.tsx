import React, { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
//images
import bomber from "images/img-game/13026.png";
import smileNotRight from "images/img-game/smile-sad.png";
import bomb from "images/img-game/bomb-in-game.png";
//Components
import Button from "components/Button/Button";
//redux state
import { RootState } from "redux/store";
//reducer
import { makeMove } from "redux/store/gameReducer";
//helper
import { mockedFunction } from "helpers/helper";
//style
import style from "./style.module.scss";

const Game = () => {
  const dispatch = useDispatch();
  const [isNotMines, setIsNotMines] = useState<boolean>(true);
  const [isMines, setIsisMines] = useState<boolean>(false);
  const [isFail, setIsFail] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [redirect, setRedirect] = useState<boolean>(false);

  const ourGame = useSelector(
    (state: RootState) => state.toolkit.arrOfItems
  ).flat();

 
  const countToWin = useMemo(()=>ourGame.filter(
    (it: { type: number }) => it.type === 0
  ).length,[ourGame]) 

  function checkMines(type: number, index: number) {
    
    
    if (type === 1) {
      setIsNotMines(false);
      setIsisMines(true);
      setIsFail(true);
      setRedirect(true);
    }
    if (type === 0) {
      setIsNotMines(true);
      setIsisMines(true);
      setCounter((counter) => (counter += 1));
      setIndex(index);
    }
  }
  useEffect(() => {
    
    console.log(redirect)
    if (isMines && isNotMines) {
      dispatch(makeMove(index));
    }
  }, [isMines, isNotMines, dispatch, index,redirect]);

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
          {!ourGame.length ? (
            <div>
              <Button
                styles={style.toMainPageBtn}
                value="Ви втратили свій прогрес ,перейдіть до головного меню"
                to="*"
                onClick={mockedFunction}
              />
            </div>
          ) : (
            ourGame.map((it: { type: number; value: boolean }, i: number) => {
              return (
                <div
                  key={i}
                  className={it.value === true ? style.active : style.curIt}
                  onClick={
                    isFail ? mockedFunction : () => checkMines(it.type, i)
                  }
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
        {/* i don't find other methods */}
        {redirect ? <Navigate replace={true} to="/menu" /> : null}
      </div>
    </div>
  );
};

export default Game;
