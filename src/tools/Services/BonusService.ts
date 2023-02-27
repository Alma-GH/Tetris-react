import {Bonus} from "../../types/enums";
import {randomEnum} from "../utils";

class BonusService {

    MAX_LENGTH_STACK: number = 3

    getRandomBonus(): Bonus {
        return randomEnum(Bonus)
    }

    push(stack: Bonus[], bonus: Bonus): void{
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