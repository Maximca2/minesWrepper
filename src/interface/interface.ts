export interface MyState {
    arrOfItems: ToOurArrProperty[]|any;

}
export interface ToOurArrProperty{
    value:boolean,
    type:number,
    payload:any

}
export interface makeMovePayload{
    index:number


}