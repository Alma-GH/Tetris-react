import {Bonus, FigureType} from "./enums";

export type Rotate = 1 | 2 | 3 | 4
export type Point = {
    x: number
    y: number
}
export type Cell = 0 | -1 | -2 | 1 | 2 | 3 | 4
export type Field = Cell[][]
export interface ITetris{
    score: number
    nextFigure: FigureType
    field: Field

    bonusStack: Bonus[],

    inProgress: boolean
    onPause: boolean
}


export interface IScoreMap {
    [key: number]: number
}



export type ReadonlyRow = Readonly<Cell[]>
export type ReadonlyField = Readonly<ReadonlyRow[]>