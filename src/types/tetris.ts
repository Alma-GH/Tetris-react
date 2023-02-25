import {FigureType} from "./enums";

export type Rotate = 1 | 2 | 3 | 4
export type Point = {
    x: number
    y: number
}
export type Cell = 0 | -1 | 1 | 2 | 3 | 4 | 5 | 6 | 7
export type Field = Cell[][]
export interface ITetris{
    score: number
    nextFigure: FigureType
    field: Field

    inProgress: boolean
}


export interface IScoreMap {
    [key: number]: number
}