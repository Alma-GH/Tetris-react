import React, {FC} from 'react';
import cls from "./Tetris.module.scss"
import Field from "../Field/Field";
import {useStateContext} from "../../../hooks/contexts";
import Score from "../Score/Score";

const Tetris: FC = () => {

    const context = useStateContext()
    const game = context.state.tetris

    return (
        <div className={cls.Tetris}>
            <Score score={game.score}/>
            <Field field={game.field}/>

            {!game.inProgress &&
                <div className={cls.endGame}>
                    GAME OVER
                </div>
            }
        </div>
    );
};

export default Tetris;