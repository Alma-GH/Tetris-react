import {FigureType} from "./enums";

export type Point = {
    x: number
    y: number
}
export type Field = number[][]
export interface ITetris{
    score: number
    nextFigure: FigureType
    field: Field
}