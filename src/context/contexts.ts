import {createContext} from "react";
import {IStateContext} from "../types/contextTypes";
import {FigureType} from "../types/enums";

export const StateContext = createContext<IStateContext>({
    state: {
        tetris: {
            score: 0,
            nextFigure: FigureType.I,
            field: [],
            inProgress: false,
            onPause: false
        }
    },
    setState: ()=>{}
})