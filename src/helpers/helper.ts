import { createNewGame } from "redux/store";

function createGame(lengthData: {
  countOfEmptyLines: number;
  countOfMines: number;
}) {
  const arrWithEmptyLines: any = Array(Number(lengthData.countOfEmptyLines))
    .fill(Array(Number(lengthData.countOfEmptyLines)).fill(0))
    .join("")
    .replaceAll(",", "")
    .split("")
    .map((_) => {
      return { type: 0, value: false };
    });
  const ourDataFull = arrWithEmptyLines
    .splice(0, arrWithEmptyLines.length - lengthData.countOfMines)
    .concat(
      Array(Number(lengthData.countOfMines)).fill({ type: 1, value: false })
    );

  return ourDataFull.sort(() => 0.5 - Math.random());
}

export function sendData(dispatch: any, dataToGame: any) {
  const data = [];
  const keyToLevel = "MY_LEVEL";

  if (dataToGame) {
    data.push(createGame(dataToGame));
    dispatch(createNewGame(data));
    localStorage.setItem(keyToLevel, JSON.stringify(dataToGame));
    return;
  }
  const level: any = localStorage.getItem(keyToLevel);
  const currentLevel = JSON.parse(level);
  const obj = {
    countOfEmptyLines: currentLevel.countOfEmptyLines,
    countOfMines: currentLevel.countOfMines,
  };

  data.push(createGame(obj));
  dispatch(createNewGame(data));
}

export function checkValueFromInputs(value1: number, value2: number) {
  if (!Number(value1) || !Number(value2)) {
    return false;
  }

  if (value1 > 1) {
    if (value2  < value1 ** 2 && value2 < 24 && value1 < 18) {
      return true;
    }
  }

  return false;
}

export function mockedFunction() {
  return;
}
