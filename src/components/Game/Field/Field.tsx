import React, {FC} from 'react';
import cls from "./Field.module.scss"
import Cell from "../Cell/Cell";
import {CellColor} from "../../../types/enums";
import {Field as TField} from "../../../types/tetris";


interface FieldProps{
    field: TField
}

interface ColorMap {
    [key: number]: CellColor
}

const colorMap: ColorMap = {
    1: CellColor.Y,
    2: CellColor.P
}

const Field: FC<FieldProps> = ({field}) => {


    return (
        <div className={cls.Field}>
            {field.map((row, iR)=>(
                row.map((val, iC)=>
                    <Cell key={`${iR}_${iC}`} color={colorMap[val]}/>
                )
            ))}
        </div>
    );
};

export default Field;