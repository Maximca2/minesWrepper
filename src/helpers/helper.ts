import { createNewGame } from "redux/store/gameReducer";

export function createGame() {
  return Array.from({ length: 180 }, () => {
    const length = 2;
    return { type: Math.floor(Math.random() * length), value: false };
  });
}

export function sendData(dispatch: any) {
  const data = [];
  data.push(createGame());
  dispatch(createNewGame(data));
}

export function mockedFunction(){
    return 
}


