import React, {FC} from 'react';
import cls from "./Field.module.scss"
import Cell from "../Cell/Cell";
import {CellColor} from "../../../types/enums";


interface FieldProps{
    field: number[][]
}

const Field: FC<FieldProps> = ({field}) => {


    return (
        <div className={cls.Field}>
            {field.map(row=>(
                row.map(val=>
                    <Cell color={val ? CellColor.P : CellColor.DEF}/>
                )
            ))}
        </div>
    );
};

export default Field;