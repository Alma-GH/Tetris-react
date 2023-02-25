import React, {FC, useMemo} from 'react';
import {FigureType} from "../../../types/enums";
import cls from "./Preview.module.scss"
import {Field} from "../../../types/tetris";
import {colorCellMap, previewMap} from "../../../tools/const";
import Cell from "../Cell/Cell";


interface PreviewProps {
    figure: FigureType
}

const Preview: FC<PreviewProps> = ({figure}) => {

    // const previewField = useMemo<Field>(()=>previewMap[figure], [figure])
    // console.log("PREVIEW RENDER")
    const previewField = previewMap[figure]

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