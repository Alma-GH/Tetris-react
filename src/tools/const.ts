import {CellColor, FigureType} from "../types/enums";
import {Cell, Field, ITetris} from "../types/tetris";
import {IClassCellMap, IColorCellMap, IPreviewMap, IValueCellMap} from "../types/types";
import cellCls from "../components/Game/Cell/Cell.module.scss";


//Game
export const DEF_EMPTY_FIELD: Readonly<Readonly<Cell[]>[]> = [
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
export const valueCellMap: IValueCellMap = {
  DEF: 0,
  POT: -1,

  Y: 1,
  C: 2,
  R: 3,
  B: 4,
  O: 5,
  P: 6,
  G: 7
}
export const colorCellMap: IColorCellMap = {
  0: CellColor.DEF,
  [-1]: CellColor.POT,

  1: CellColor.Y,
  2: CellColor.C,
  3: CellColor.R,
  4: CellColor.B,
  5: CellColor.O,
  6: CellColor.P,
  7: CellColor.G,
}
export const classCellMap: IClassCellMap = {
  [CellColor.DEF]: null,
  [CellColor.POT]: cellCls.purple,

  [CellColor.Y]: cellCls.yellow,
  [CellColor.B]: cellCls.blue,
  [CellColor.R]: cellCls.red,
  [CellColor.C]: cellCls.cyan,
  [CellColor.G]: cellCls.green,
  [CellColor.P]: cellCls.purple,
  [CellColor.O]: cellCls.orange,
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