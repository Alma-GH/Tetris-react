import {Bonus} from "../../types/enums";
import {randomEnum} from "../utils";
import {Cell} from "../../types/tetris";
import {bonusCellMap} from "../const";

class BonusService {

    MAX_LENGTH_STACK: number = 3

    getRandomBonus(): Bonus {
        return randomEnum(Bonus)
    }
    getBonusByCell(cell: Cell | null | undefined): Bonus | null{
        if(cell == 2 || cell == 3 || cell == 4)
            return bonusCellMap[cell]
        return null
    }

    push(stack: Bonus[], bonus: Bonus | null): void{
        if(bonus == null)
            return

        if(stack.length == this.MAX_LENGTH_STACK){
            stack.shift()
        }
        stack.push(bonus)
    }
    pushRandom(stack: Bonus[]): void{
        this.push(stack, this.getRandomBonus())
    }
    pop(stack: Bonus[]): Bonus | null {
        return stack.pop() || null
    }
}


export default new BonusService()