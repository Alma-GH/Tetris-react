import './App.scss'
import Tetris from "./components/Game/Tetris/Tetris";
import {useState} from "react";
import {StateContext} from "./context/contexts";
import {IState} from "./types/contextTypes";
import {DEF_TETRIS} from "./tools/const";

function App() {

    const [state, setState] = useState<IState>({
        tetris: structuredClone(DEF_TETRIS)
    })

  return (
      <StateContext.Provider value={{state, setState}}>
          <div className="App">
              <Tetris/>
          </div>
      </StateContext.Provider>

  )
}

export default App



/*
    TODO:
        1)feature: bonuses
            1)bomb
            2)fire
            3)change figure
        2)change controls
        3)styles
        4)audio
 */