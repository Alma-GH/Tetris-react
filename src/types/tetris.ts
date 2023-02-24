import {FigureType} from "./enums";

export type Rotate = 1 | 2 | 3 | 4
export type Point = {
    x: number
    y: number
}
export type Field = number[][]
export interface ITetris{
    score: number
    nextFigure: FigureType
    field: Field

    inProgress: boolean
}


export interface IScoreMap {
    [key: number]: number
}