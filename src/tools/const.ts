import {CellColor, FigureType} from "../types/enums";
import {Field, ITetris} from "../types/tetris";
import {IColorMap, IPreviewMap} from "../types/types";


//Game
export const DEF_EMPTY_FIELD: Readonly<Readonly<number[]>[]> = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
]

export const SIZE_H_FIELD = DEF_EMPTY_FIELD.length
export const SIZE_W_FIELD = DEF_EMPTY_FIELD[0].length


export const DEF_TETRIS: ITetris = {
  score: 0,
  nextFigure: FigureType.I,
  field: DEF_EMPTY_FIELD as Field,
  inProgress: false
}



//Other
export const colorMap: IColorMap = {
  1: CellColor.Y,
  2: CellColor.P
}


export const previewMap: IPreviewMap = {
  [FigureType.I]: [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,1,1,1,1,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
  ],
  [FigureType.O]: [
    [0,0,0,0,0,0],
    [0,0,1,1,0,0],
    [0,0,1,1,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
  ],
  [FigureType.T]: [
    [0,0,0,0,0,0],
    [0,0,1,0,0,0],
    [0,0,1,1,0,0],
    [0,0,1,0,0,0],
    [0,0,0,0,0,0],
  ],
  [FigureType.J]: [
    [0,0,0,0,0,0],
    [0,0,0,1,0,0],
    [0,0,0,1,0,0],
    [0,0,1,1,0,0],
    [0,0,0,0,0,0],
  ],
  [FigureType.L]: [
    [0,0,0,0,0,0],
    [0,0,1,0,0,0],
    [0,0,1,0,0,0],
    [0,0,1,1,0,0],
    [0,0,0,0,0,0],
  ],
  [FigureType.S]: [
    [0,0,0,0,0,0],
    [0,0,1,0,0,0],
    [0,0,1,1,0,0],
    [0,0,0,1,0,0],
    [0,0,0,0,0,0],
  ],
  [FigureType.Z]: [
    [0,0,0,0,0,0],
    [0,0,0,1,0,0],
    [0,0,1,1,0,0],
    [0,0,1,0,0,0],
    [0,0,0,0,0,0],
  ],
}




//LocalStorage

export const S_RECORD = "S_RECORD"