import {Field, ITetris} from "../../types/tetris";
import {FigureType} from "../../types/enums";
import {DEF_EMPTY_FIELD} from "../const";

class TetrisService {

    // field: Field = structuredClone(DEF_EMPTY_FIELD)
    // nextFigureType: FigureType | null = null

    tetris: ITetris | null = null
    tick: number = 1000

    setTetris(newTetris: ITetris): void{
        this.tetris = newTetris
    }

    getField(): Field | null{
        if(this.tetris == null)
            return null

        return this.tetris.field
    }
    setField(newField: Field): void{
        if(this.tetris == null)
            return

        this.tetris.field = newField
    }


    startGame(): void{
        if(this.tetris == null)
            return

        if(this.tetris.nextFigure === null)
            this.tetris.nextFigure = FigureType.I //TODO: random


        const figure = this.tetris.nextFigure
        const field = this.tetris.field

        setTimeout(()=>{

        }, this.tick)
    }


}

export default new TetrisService()