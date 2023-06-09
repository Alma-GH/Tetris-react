import React, {FC} from 'react';
import cls from "./Tetris.module.scss"
import Field from "../Field/Field";
import {useStateContext} from "../../../hooks/contexts";
import Score from "../Score/Score";
import Preview from "../Preview/Preview";
import {useTetrisControls} from "../../../hooks/useTetrisControls";
import {useStoreScoreRecord} from "../../../hooks/useStoreScoreRecord";
import Controls from "../Controls/Controls";
import BonusStack from "../BonusStack/BonusStack";

const Tetris: FC = () => {

    const context = useStateContext()
    const game = context.state.tetris

    useTetrisControls()
    useStoreScoreRecord(game.score)

    return (
        <div className={cls.Tetris}>
            <Score score={game.score}/>
            <Preview figure={game.nextFigure} bonus={game.bonus}/>
            <Field field={game.field}/>
            <Controls/>
            <BonusStack bonuses={game.bonusStack}/>

            {/*TODO: comp */}
            {!game.inProgress &&
                <div className={cls.endGame}>
                    GAME OVER
                </div>
            }
            {game.onPause &&
                <div className={cls.endGame}>
                  PAUSE
                </div>
            }
        </div>
    );
};

export default Tetris;