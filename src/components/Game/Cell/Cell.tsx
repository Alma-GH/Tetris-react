import React, {FC} from 'react';
import {CellColor} from "../../../types/enums";
import cls from "./Cell.module.scss"
import {classCellMap} from "../../../tools/const";

interface CellProps{
    color?: CellColor
}

const Cell: FC<CellProps> = ({color = CellColor.DEF}) => {

    const style = [cls.Cell]
    const colorClass = classCellMap[color]
    if(colorClass)
        style.push(colorClass)

    return (
        <span className={style.join(" ")}/>
    );
};

export default Cell;