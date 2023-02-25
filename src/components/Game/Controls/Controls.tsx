import React, {ChangeEventHandler, MouseEventHandler, useRef, useState} from 'react';
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import {DEF_TETRIS} from "../../../tools/const";
import TetrisService from "../../../tools/Services/TetrisService";
import {useStateContext} from "../../../hooks/contexts";
import cls from "./Controls.module.scss"

const Controls = () => {

    const context = useStateContext()
    const setState = context.setState

    const timer = useRef<number>()
    const btnRef = useRef<HTMLButtonElement>(null)

    const [isChangeDifficult, setIsChangeDifficult] = useState<boolean>(false)

    const startGame: MouseEventHandler<HTMLButtonElement> = () => {

        const newState = {
            tetris: structuredClone(DEF_TETRIS)
        }

        setState(newState)

        const updateTime = 50
        function updateGame(){
            const tetris = TetrisService.getTetris()
            const log = false
            if(log)
                console.log({
                    tetris: TetrisService.tetris,
                    figure: {
                        type: TetrisService.curFigure?.type,
                        points: TetrisService.curFigure?.points
                    }})
            if(tetris)
                setState({tetris})
            else
                console.log("NULL TETRIS")
        }

        TetrisService.setTetris(newState.tetris)
        TetrisService.startGame(isChangeDifficult)
        timer.current = setInterval(updateGame, updateTime)
        btnRef.current?.blur()
    }
    const stopGame: MouseEventHandler<HTMLButtonElement> = () => {
        // clearInterval(timer.current);
        TetrisService.stopGame()
        console.log("STOP GAME")
    }
    const toggleDifficult: ChangeEventHandler<HTMLInputElement> = (e) => {
        const val = e.target.checked
        setIsChangeDifficult(val)
    }


    return (
        <div className={cls.Controls}>
            <Button variant={"contained"}  ref={btnRef}  onClick={startGame} >
                START
            </Button>
            <Button variant={"contained"} onClick={stopGame}>
                STOP
            </Button>

            <FormControlLabel
                control={
                    <Checkbox
                        onChange={toggleDifficult}
                        color={"secondary"}
                        checked={isChangeDifficult}
                    />
                }
                label="Change difficult"
            />

        </div>
    );
};

export default Controls;