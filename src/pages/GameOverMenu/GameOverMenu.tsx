import React from "react";
//Components
import Button from "../../Components/Button";
//style
import style from "./style.module.scss";

const GameOverMenu = () => {
  return (
    <div className={style.box}>
      <div className={style.menuBox}>
        <div className={style.message}>Game over</div>
        <div className={style.boxForBtn}>
          <Button
            styles={style.toMenu}
            value="Перейти до головного  меню"
            to="*"
            onClick={(any) => any}
          />
        </div>
      </div>
    </div>
  );
};

export default GameOverMenu;
