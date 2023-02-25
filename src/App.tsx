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
        1)change tick (true/false)
        2)
        3)pause
        4)styles
        5)spawn out field -> change condition for game over
        6)
        7)feature: bonuses
 */