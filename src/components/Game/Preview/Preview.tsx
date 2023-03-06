import React, {FC} from 'react';
import {Bonus, FigureType} from "../../../types/enums";
import cls from "./Preview.module.scss"
import {colorCellMap, previewMap, valueCellMap} from "../../../tools/const";
import Cell from "../Cell/Cell";


interface PreviewProps {
    figure: FigureType,
    bonus: Bonus | null
}

const Preview: FC<PreviewProps> = ({ figure, bonus}) => {

    const previewField = previewMap[figure]

    return (
        <div className={cls.Preview}>
            {previewField.map((row,iR)=>(
                row.map((val,iC)=>{
                    if(bonus && val == 1){
                        val = valueCellMap[bonus]
                    }

                    return (<Cell
                        key={`${iR}_${iC}`}
                        color={colorCellMap[val]}
                    />)
                })
            ))}
        </div>
    );
};

export default Preview;