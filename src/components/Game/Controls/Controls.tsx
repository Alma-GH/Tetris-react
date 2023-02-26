import React, {ChangeEventHandler, MouseEventHandler, useRef, useState} from 'react';
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import {DEF_TETRIS} from "../../../tools/const";
import TetrisService from "../../../tools/Services/TetrisService";
import {useStateContext} from "../../../hooks/contexts";
import cls from "./Controls.module.scss"

const Controls = () => {

    const context = useStateContext()
    const tetris = context.state.tetris
    const setState = context.setState

    const timer = useRef<number>()
    const btnRefNewGame = useRef<HTMLButtonElement>(null)
    const btnRefPause = useRef<HTMLButtonElement>(null)


    const [isChangeDifficult, setIsChangeDifficult] = useState<boolean>(false)

    const startGame: MouseEventHandler<HTMLButtonElement> = () => {
        clearInterval(timer.current)
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

            if(!tetris?.inProgress)
                clearInterval(timer.current)
        }

        TetrisService.setTetris(newState.tetris)
        TetrisService.startGame(isChangeDifficult)
        timer.current = setInterval(updateGame, updateTime)
        btnRefNewGame.current?.blur()
    }
    const togglePause: MouseEventHandler<HTMLButtonElement> = () => {
        if(!tetris.inProgress)
            return

        if(!tetris.onPause)
            TetrisService.pause()
        else
            TetrisService.unpause()

        btnRefPause.current?.blur()
    }
    const toggleDifficult: ChangeEventHandler<HTMLInputElement> = (e) => {
        const val = e.target.checked
        setIsChangeDifficult(val)
    }

    return (
        <div className={cls.Controls}>
            <Button variant={"contained"}  ref={btnRefNewGame}  onClick={startGame} >
                NEW GAME
            </Button>
            <Button variant={"contained"} ref={btnRefPause} onClick={togglePause}>
                {!tetris.onPause
                    ? "PAUSE"
                    : "PLAY"
                }
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