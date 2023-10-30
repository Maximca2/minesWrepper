//MyState
export interface MyState {
    results:ToOurArrProperty[]|any,
    arrOfItems: ToOurArrProperty[]|any;
}
//ToOurArrProperty
export interface ToOurArrProperty{
    
    value:boolean,
    type:number,
    payload:any
}

///makeMove
export interface makeMovePayload{
    index:number
}