import './App.scss'
import Tetris from "./components/Game/Tetris/Tetris";
import {useRef, useState} from "react";
import {StateContext} from "./context/contexts";
import {IState} from "./types/contextTypes";
import {DEF_TETRIS} from "./tools/const";
import TetrisService from "./tools/Services/TetrisService";
import {useTetrisControls} from "./hooks/useTetrisControls";
import {useStoreScoreRecord} from "./hooks/useStoreScoreRecord";

function App() {

    const timer = useRef<number>()
    const btnRef = useRef<HTMLButtonElement>(null)
    const [state, setState] = useState<IState>({
        tetris: structuredClone(DEF_TETRIS)
    })

    useTetrisControls()
    useStoreScoreRecord(state.tetris.score)

    function startGame(){

        const newState = {
            tetris: structuredClone(DEF_TETRIS)
        }

        setState(newState)

        const updateTime = 50
        function updateGame(){
            const tetris = TetrisService.getTetris()
            const log = true
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
        TetrisService.startGame()
        timer.current = setInterval(updateGame, updateTime)
        btnRef.current?.blur()
    }
    function stopGame(){
        clearInterval(timer.current);
        TetrisService.stopGame()
        console.log("STOP GAME")
    }


  return (
      <StateContext.Provider value={{state, setState}}>
          <div className="App">
              <Tetris/>
              <button ref={btnRef}  onClick={startGame} style={{position: "absolute", top: 0, left: 0}}>
                  START
              </button>
              <button onClick={stopGame} style={{position: "absolute", top:50, left: 0}}>
                  STOP
              </button>
          </div>
      </StateContext.Provider>

  )
}

export default App



/*
    TODO:
        1)change tick (true/false)
        2)
        3)pause
        4)styles
        5)spawn out field -> change condition for game over
        6)Field service
        7)feature: bonuses
 */