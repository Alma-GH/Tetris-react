import React, {FC} from 'react';
import cls from "./BonusStack.module.scss"
import Cell from "../Cell/Cell";
import {Bonus} from "../../../types/enums";
import {colorCellMap, valueCellMap} from "../../../tools/const";
import {Cell as CellT} from "./../../../types/tetris"

interface BonusStackProps {
    bonuses: Bonus[]
}

const BonusStack: FC<BonusStackProps> = ({bonuses}) => {

    const cells = bonuses.map(bonus=>valueCellMap[bonus])
    while(cells.length < 3)
        cells.push(0)

    return (
        <div className={cls.BonusStack}>
            {cells.reverse().map((cell, index)=>(
                <Cell key={`${cell}_${index}`} color={colorCellMap[cell]}/>
            ))}
        </div>
    );
};

export default BonusStack;