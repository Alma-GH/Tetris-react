import './App.scss'
import Tetris from "./components/Game/Tetris/Tetris";
import {useRef, useState} from "react";
import {StateContext} from "./context/contexts";
import {IState} from "./types/contextTypes";
import {FigureType} from "./types/enums";
import {DEF_EMPTY_FIELD} from "./tools/const";
import TetrisService from "./tools/Services/TetrisService";
import {useControls} from "./hooks/useControls";

function App() {



    const timer = useRef<number>()
    const [state, setState] = useState<IState>({
        tetris: {
            score: 0,
            nextFigure: FigureType.I,
            field: structuredClone(DEF_EMPTY_FIELD),
            inProgress: false
        }
    })

    useControls()

    function startGame(){

        const updateTime = 100
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

        TetrisService.setTetris(state.tetris)
        TetrisService.startGame()
        timer.current = setInterval(updateGame, updateTime)
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
              <button onClick={startGame} style={{position: "absolute", top: 0, left: 0}}>
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
