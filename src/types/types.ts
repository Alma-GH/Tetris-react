import {CellColor, FigureType} from "./enums";
import {Cell, Field} from "./tetris";


export type CellNames =
    "DEF" | "POT" | "EMT" |
    "OCCUPIED" |
    "BOMB" | "FIRE" | "CHANGER"

export type IColorCellMap = {
    [key in Cell]: CellColor
}

export type IClassCellMap = {
    [key in CellColor]: string | null
}

export type IPreviewMap = {
    [key in FigureType]: Field;
};

