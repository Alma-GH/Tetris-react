import React, {FC, useMemo} from 'react';
import {Bonus, FigureType} from "../../../types/enums";
import cls from "./Preview.module.scss"
import {Field} from "../../../types/tetris";
import {colorCellMap, previewMap, valueCellMap} from "../../../tools/const";
import Cell from "../Cell/Cell";
import TetrisService from "../../../tools/Services/TetrisService";
import BonusService from "../../../tools/Services/BonusService";


interface PreviewProps {
    figure: FigureType
}

const Preview: FC<PreviewProps> = ({ figure}) => {

    // const previewField = useMemo<Field>(()=>previewMap[figure], [figure])
    // console.log("PREVIEW RENDER")
    const previewField = previewMap[figure]
    //     .map(val => {
    //
    //     if(TetrisService.bonus)
    //     {
    //         let bonus = TetrisService.bonus
    //
    //         return val.map(clr => clr == 1
    //             ? valueCellMap[bonus]
    //             : clr
    //         )
    //     }
    //     return val
    // });

    return (
        <div className={cls.Preview}>
            {previewField.map((row, iR)=>(
                row.map((val, iC)=>
                    <Cell key={`${iR}_${iC}`} color={colorCellMap[val]}/>
                )
            ))}
        </div>
    );
};

export default Preview;