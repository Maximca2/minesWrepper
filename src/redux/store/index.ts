import { combineReducers,configureStore} from "@reduxjs/toolkit"

import {gameReducer} from './gameReducer'

const RootReducer = combineReducers ({
    toolkit:gameReducer
})

export const store = configureStore({
    reducer:RootReducer,
    
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>