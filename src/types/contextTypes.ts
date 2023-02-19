import {ITetris} from "./tetris";


export interface IState {
    tetris: ITetris
}
export interface IStateContext{
    state: IState
    setState: (newState: IState) => void
}

