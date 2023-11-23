export interface CurrentStateTypes {
  results: ToReducerFullPropertyTypes[] ;
  arrOfItems: ToReducerFullPropertyTypes[] ;
}

export interface ToReducerFullPropertyTypes {
  value: boolean;
  type: number;
  payload: number;
  [index:number]:|{value: boolean}
  
  
}
export interface CurGameTypes {
  countOfEmptyLines: string|any;
  countOfMines: string|any;
}


