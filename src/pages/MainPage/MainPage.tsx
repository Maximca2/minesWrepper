import React from "react";
import { useDispatch } from "react-redux";
//Components
import Button from "components/Button/Button";
//helper
import { sendData } from "helpers/helper";
//style
import style from "./style.module.scss";

const MainPage = () => {

  const dispatch = useDispatch();
  
  return (
    <div>
      <div className={style.box}>
        <div className={style.tittle}>MinesWeeper</div>
        <Button
          styles={style.btnStart}
          value="Розпочати гру"
          to="/startGame"
          onClick={() => sendData(dispatch)}
        />
      </div>
    </div>
  );
};

export default MainPage;
