import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import bomb from "images/img-game/bomb-in-game.png";
//Components
import Button from "components/Button";
//helper
import { mockedFunction, sendData } from "helpers/helper";
//style
import style from "./style.module.scss";

const GameOverMenu = () => {

  const dispatch = useDispatch();
  const ourGame = useSelector(
    (state: RootState) => state.toolkit.arrOfItems
  ).flat();

  return (
    <div className={style.box}>
      <div className={style.menuBox}>
        <div className={style.message}>Game over</div>
        <div className={style.boxForBtn}>
          <Button
            styles={style.toMenu}
            value="Перейти до головного  меню"
            to="*"
            onClick={mockedFunction}
          />
          <Button
            styles={style.toRestart}
            value="Розпочати гру заново"
            to="/startGame"
            onClick={() => sendData(dispatch)}
          />
          <div className={style.yourResult}>Your Result</div>
          <div className={style.weeperResultTable}>
            {!ourGame.length
              ? null
              : ourGame.map(
                  (it: { type: number; value: boolean }, i: number) => {
                    return (
                      <div
                        key={i}
                        className={
                          it.value === true ? style.active : style.curIt
                        }
                      >
                        <img
                          className={style.bomb}
                          src={it.type === 1 ? bomb : ""}
                          alt=""
                        />
                      </div>
                    );
                  }
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverMenu;
