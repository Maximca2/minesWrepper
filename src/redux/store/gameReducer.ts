import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
//interface
import {
  makeMovePayload,
  MyState,
  ToOurArrProperty,
} from "../../interface/interface";
import { CREATE_GAME } from "./actions";
// DefaultState
const defaultState: MyState = {
  arrOfItems: [],
};
// actions
export const createNewGame = createAction<any>(CREATE_GAME);
export const makeMove = createAction<any>("CREATE_N");

//Reducer
export const gameReducer = createReducer(defaultState, (builder) =>
  builder
    .addCase(
      createNewGame,
      (state: MyState, { payload }: PayloadAction<ToOurArrProperty>) => {
        state.arrOfItems = payload;
      }
    )
    .addCase(
      makeMove,
      (state: MyState, { payload }: PayloadAction<makeMovePayload>) => {
        const getIndex: any = [payload];

        const index: number = getIndex;

        state.arrOfItems[index].value = true;
      }
    )
);
