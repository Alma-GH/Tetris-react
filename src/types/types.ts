import {CellColor, FigureType} from "./enums";
import {Cell, Field} from "./tetris";


export interface IValueCellMap {
    [key: string]: Cell
}
export type IColorCellMap = {
    [key in Cell]: CellColor
}

export type IClassCellMap = {
    [key in CellColor]: string | null
}

export type IPreviewMap = {
    [key in FigureType]: Field;
};

