import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
//interface
import {
  CurrentStateTypes,
  ToReducerFullPropertyTypes,
} from "interface/interface";
import { CREATE_GAME, MAKE_MOVE } from "./actions";
// DefaultState
const defaultState: CurrentStateTypes = {
  arrOfItems: [],
  results: [],
};
// actions
export const createNewGame = createAction<any>(CREATE_GAME);
export const makeMove = createAction<any>(MAKE_MOVE);

//Reducer
export const gameReducer = createReducer(defaultState, (builder) =>
  builder
    .addCase(
      createNewGame,
      (state: CurrentStateTypes, { payload }: PayloadAction<ToReducerFullPropertyTypes[]>) => {
        state.arrOfItems = payload;
      }
    )
    .addCase(
      makeMove,
      (state: CurrentStateTypes, { payload }: PayloadAction<ToReducerFullPropertyTypes[]>) => {
        const getIndex: any = [payload];

        const index: number = getIndex;

        state.arrOfItems[0][index].value = true;
      }
    )
);
