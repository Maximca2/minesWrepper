import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
//img
import bomb from "images/img-game/bomb-in-game.png";
//Components
import Button from "сomponents/Button";
//helper
import { sendData } from "helpers";
//style
import style from "./style.module.scss";

function removeCurrentLevel() {
  return localStorage.clear();
}

const GameOverMenu = () => {
  const dispatch = useDispatch();
  const ourGame = useSelector(
    (state: RootState) => state.toolkit.arrOfItems
  ).flat();

  const ourGameResultStyle = {
    display: "grid",
    gridColumnGap:14,
    rowSpacing:13,
    gridTemplateColumns: `repeat(${Math.sqrt(
      ourGame ? ourGame.length : 4
    )},40px)`,
    marginTop:40
  };
  return (
    <div className={style.box}>
      <div className={style.menuBox}>
        <div className={style.message}>Game over</div>
        <div className={style.boxForBtn}>
          <Button
            styles={style.toMenu}
            value="Перейти до головного  меню"
            to="*"
            onClick={() => removeCurrentLevel()}
          />
          {
            <Button
              styles={style.toRestart}
              value="Розпочати гру заново"
              to="/startGame"
              onClick={() => sendData(dispatch, null)}
            />
          }

          <div className={style.yourResult}>Your Result</div>
          <div style={ourGameResultStyle} >
            {!ourGame.length
              ? null
              : ourGame.map(
                  (it: { type: number; value: boolean }, i: number) => {
                    return (
                      <div
                        key={i}
                        className={it.value ? style.active : style.curIt}
                      >
                        <img
                          className={style.bomb}
                          src={it.type ? bomb : ""}
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
