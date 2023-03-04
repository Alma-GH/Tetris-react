import {Bonus, CellColor, FigureType} from "../types/enums";
import {Cell, Field, ITetris, ReadonlyField, ReadonlyRow} from "../types/tetris";
import {BonusCell, CellNames, IClassCellMap, IColorCellMap, IPreviewMap} from "../types/types";
import cellCls from "../components/Game/Cell/Cell.module.scss";


//Game

export const DEF_EMPTY_START_FIELD: ReadonlyField = [
  [-2,-2,-2,-2,-2,-2,-2,-2,-2,-2] as ReadonlyRow,
  [-2,-2,-2,-2,-2,-2,-2,-2,-2,-2] as ReadonlyRow,
  [-2,-2,-2,-2,-2,-2,-2,-2,-2,-2] as ReadonlyRow,
  [-2,-2,-2,-2,-2,-2,-2,-2,-2,-2] as ReadonlyRow,
  [-2,-2,-2,-2,-2,-2,-2,-2,-2,-2] as ReadonlyRow,
]

export const DEF_EMPTY_FIELD: ReadonlyField = [

    ...DEF_EMPTY_START_FIELD,

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



/*
    [0,0,0,0,0,0,0,0,0,0].fill(1,1) as ReadonlyRow,
    [0,0,0,0,0,0,0,0,0,0].fill(1,1) as ReadonlyRow,
    [0,0,0,0,0,0,0,0,0,0].fill(1,1) as ReadonlyRow,
 */

/*
new Array(25).fill(0)
    .map((val, ind,arr)=>{
        if(ind<5)
            return new Array(10).fill(-2)
        else
            return new Array(10).fill(-2)
    })
 */

export const DEF_TETRIS: ITetris = {
  score: 0,
  nextFigure: FigureType.I,
  field: DEF_EMPTY_FIELD as Field,
  bonusStack: [],
  inProgress: false,
  onPause: false
}




//Maps
export const bonusCellMap : Record<BonusCell, Bonus> = {
    2: Bonus.BOMB,
    3: Bonus.FIRE,
    4: Bonus.CHANGER
}
export const valueCellMap: Record<CellNames, Cell> = {
  DEF: 0,
  POT: -1,
  EMT: -2,

  OCCUPIED: 1,

  BOMB: 2,
  FIRE: 3,
  CHANGER: 4
}
export const colorCellMap: IColorCellMap = {
  0: CellColor.DEF,
  [-1]: CellColor.P,
  [-2]: CellColor.EMT,

  1: CellColor.Y,

  2: CellColor.R,
  3: CellColor.O,
  4: CellColor.G,
}
export const classCellMap: IClassCellMap = {
  [CellColor.DEF]: null,
  [CellColor.EMT]: cellCls.empty,

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