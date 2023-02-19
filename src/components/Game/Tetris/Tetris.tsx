import React, {FC} from 'react';
import cls from "./Tetris.module.scss"
import Field from "../Field/Field";
import {useStateContext} from "../../../hooks/contexts";

const Tetris: FC = () => {

    const context = useStateContext()
    const game = context.state.tetris

    return (
        <div className={cls.Tetris}>
            <Field field={game.field}/>
        </div>
    );
};

export default Tetris;