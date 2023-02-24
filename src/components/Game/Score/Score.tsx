import React, {FC} from 'react';
import cls from "./Score.module.scss"
import {S_RECORD} from "../../../tools/const";


interface ScoreProps {
    score: number
}

const Score: FC<ScoreProps> = ({score}) => {



    return (
        <div className={cls.Score}>
            SCORE: {score} <br/>
            RECORD: {localStorage.getItem(S_RECORD)}
        </div>
    );
};

export default Score;