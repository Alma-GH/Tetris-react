import './App.scss'
import Tetris from "./components/Game/Tetris/Tetris";
import {useState} from "react";
import {StateContext} from "./context/contexts";
import {IState} from "./types/contextTypes";
import {FigureType} from "./types/enums";
import {DEF_EMPTY_FIELD} from "./tools/const";
import Figure from "./tools/Services/Figure";

function App() {

    const [state, setState] = useState<IState>({
        tetris: {
            score: 0,
            nextFigure: FigureType.I,
            field: structuredClone(DEF_EMPTY_FIELD)
        }
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
