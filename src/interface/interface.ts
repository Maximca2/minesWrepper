export interface MyState {
  results: ToOurArrProperty[] | any;
  arrOfItems: ToOurArrProperty[] | any;
}
export interface ToOurArrProperty {
  value: boolean;
  type: number;
  payload: any;
}
export interface MakeMovePayload {
  index: number;
}
export interface CurGameData {
  countOfEmptyLines: number|any;
  countOfMines: string|any;
}
