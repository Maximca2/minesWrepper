import React from "react";
//Components
import Button from "сomponents/Button";
//helper
import { mockedFunction } from "helpers";
//style
import style from "./style.module.scss";

const MainPage = () => {
  return (
    <div>
      <div className={style.box}>
        <div className={style.tittle}>MinesWeeper</div>
        <Button
          styles={style.btnStart}
          value="Розпочати гру"
          to="/createOwnLevel"
          onClick={mockedFunction}
        />
      </div>
    </div>
  );
};

export default MainPage;
