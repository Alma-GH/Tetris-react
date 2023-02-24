import {CellColor, FigureType} from "./enums";
import {Field} from "./tetris";


export interface IColorMap {
    [key: number]: CellColor
}

export type IPreviewMap = {
    [key in FigureType]: Field;
};