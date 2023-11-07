import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
//interface
import {
  MakeMovePayload,
  MyState,
  ToOurArrProperty,
} from "interface/interface";
import { CREATE_GAME, MAKE_MOVE } from "./actions";
// DefaultState
const defaultState: MyState = {
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
      (state: MyState, { payload }: PayloadAction<ToOurArrProperty>) => {
        console.log(payload)
        state.arrOfItems = payload;
      }
    )
    .addCase(
      makeMove,
      (state: MyState, { payload }: PayloadAction<MakeMovePayload>) => {
        const getIndex: any = [payload];

        const index: number = getIndex;

        state.arrOfItems[0][index].value = true;
      }
    )
);
