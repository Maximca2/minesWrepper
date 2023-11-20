/* eslint-disable no-self-compare */
import React, { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//images
import bomber from "images/img-game/13026.png";
//Components
import Button from "сomponents/Button";
//redux state(&reducer)
import { RootState, makeMove } from "redux/store";
//helper
import { mockedFunction } from "helpers";
//style
import style from "./style.module.scss";
import "react-toastify/dist/ReactToastify.css";

const Game = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isNotMines, setIsNotMines] = useState<boolean>(false);
  const [isFail, setIsFail] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [uniqueIndexes, setUniqueIndexes] = useState<any>([]);

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
    display: "grid",
    gridTemplateColumns: `repeat(${Math.sqrt(
      Number(countToWin + countOfMines)
    )}, 40px)`,
    gap: 1,
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function toastSuccess() {
    if (countToWin === countToWin) {
      toast.success("Ви виграли", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  useEffect(() => {
    if (counter === countToWin) {
      toastSuccess();
      setTimeout(() => {
        navigate("/main");
      }, 3000);
    }
  }, [countToWin, counter, navigate, toastSuccess]);

  function checkMines(type: number, index: number) {
    if (type) {
      setIsNotMines(true);
      setIsFail(true);
      navigate("/menu");
      return;
    }

    setIsNotMines(true);
    setIndex(index);
    const ourIndexes = [...uniqueIndexes, index];
    setUniqueIndexes(ourIndexes);

    if (!uniqueIndexes.includes(index)) {
      setCounter((counter) => (counter += 1));

      return;
    }
  }
  useEffect(() => {
    if (isNotMines) {
      dispatch(makeMove(index));
    }
    if (!ourGame.length) {
      navigate("/main");
    }
  }, [isNotMines, dispatch, index, navigate, ourGame]);

  return (
    <div className={style.box}>
      <ToastContainer limit={1} />
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
                    isFail || counter === countToWin
                      ? mockedFunction
                      : () => checkMines(it.type, i)
                  }
                ></div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
