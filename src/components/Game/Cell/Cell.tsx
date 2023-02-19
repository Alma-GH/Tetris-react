import React, {FC} from 'react';
import {CellColor} from "../../../types/enums";
import cls from "./Cell.module.scss"

interface CellProps{
    color?: CellColor
}

const classMap = {
    [CellColor.DEF]: null,
    [CellColor.Y]: cls.yellow,
    [CellColor.B]: cls.blue,
    [CellColor.R]: cls.red,
    [CellColor.C]: cls.cyan,
    [CellColor.G]: cls.green,
    [CellColor.P]: cls.purple,
    [CellColor.O]: cls.orange,
}

const Cell: FC<CellProps> = ({color = CellColor.DEF}) => {

    const style = [cls.Cell]
    const colorClass = classMap[color]
    if(colorClass)
        style.push(colorClass)

    return (
        <div className={style.join(" ")}>
            
        </div>
    );
};

export default Cell;