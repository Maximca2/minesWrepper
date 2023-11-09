import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//images
import bomber from "images/img-game/13026.png";
import smileNotRight from "images/img-game/smile-sad.png";
import bomb from "images/img-game/bomb-in-game.png";
//Components
import Button from "сomponents/Button";
//redux state
import { RootState } from "redux/store";
//reducer
import { makeMove } from "redux/store";
//helper
import { mockedFunction } from "helpers";
//style
import style from "./style.module.scss";


const Game = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isNotMines, setIsNotMines] = useState<boolean>(true);
  const [isMines, setIsisMines] = useState<boolean>(false);
  const [isFail, setIsFail] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [uniqueIndexes ,setUniqueIndexes] = useState<any>([])

  const ourGame = useSelector(
    (state: RootState) => state.toolkit.arrOfItems
  ).flat();

  const countToWin = useMemo(
    () => ourGame.filter((it: { type: number }) => !it.type).length,
    [ourGame]
  );
  const countOfMines = useMemo(
    () => ourGame.filter((it: { type: number }) => it.type).length,
    [ourGame]
  );
  const styleNet = {
    display:'grid', 
    gridTemplateColumns: `repeat(${Math.sqrt(Number(countToWin+countOfMines))}, 40px)`,
     gap:1,
     
  }

  function checkMines(type: number, index: number) {
    
    if (type) {
      setIsNotMines(false);
      setIsisMines(true);
      setIsFail(true);
      setRedirect(true);
      return;
    }

    
    setIsNotMines(true);
    setIsisMines(true);
    setIndex(index);
    const ourIndexes = [...uniqueIndexes,index]
    setUniqueIndexes(ourIndexes)
    
    if(!uniqueIndexes.includes(index)){
      setCounter((counter) => (counter += 1));
      return 
    }
    
    
  }
  useEffect(() => {
    if (isMines && isNotMines) {
      dispatch(makeMove(index));
    }
    if (redirect) {
      navigate("/menu");
    }
    
    if(!ourGame.length){
      
      navigate('/main')
    }
  }, [isMines, isNotMines, dispatch, index, redirect, navigate,ourGame]);

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
          <div className={style.weeperCount}>кількість мін /{countOfMines}</div>
          <div className={style.smiles}>
            <img src={isNotMines || !isMines ? "" : smileNotRight} alt="" />
          </div>
        </div>
        <div style={styleNet}>
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
                  className={it.value ? style.active : style.curIt}
                  onClick={
                    isFail ? mockedFunction : () => checkMines(it.type, i)
                  }
                >
                  <img
                    className={style.bomb}
                    src={!isNotMines && it.type ? bomb : ""}
                    alt=""
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
