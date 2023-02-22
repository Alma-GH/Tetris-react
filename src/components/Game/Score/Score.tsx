import React, {FC} from 'react';
import cls from "./Score.module.scss"


interface ScoreProps {
    score: number
}

const Score: FC<ScoreProps> = ({score}) => {



    return (
        <div className={cls.Score}>
            {score}
        </div>
    );
};

export default Score;