import React, {FC} from 'react';
import cls from "./Field.module.scss"
import Cell from "../Cell/Cell";
import {Field as TField} from "../../../types/tetris";
import {colorCellMap} from "../../../tools/const";


interface FieldProps{
    field: TField
}

const Field: FC<FieldProps> = ({field}) => {


    return (
        <div className={cls.Field}>
            {field.map((row, iR)=>(
                row.map((val, iC)=>
                    <Cell key={`${iR}_${iC}`} color={colorCellMap[val]}/>
                )
            ))}
        </div>
    );
};

export default Field;