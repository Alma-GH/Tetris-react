import Figure from "./Figure";
import {Bonus, FigureType} from "../../types/enums";
import {ITetris} from "../../types/tetris";
import FieldService from "./FieldService";


class BonusFigure extends Figure{

    bonus: Bonus

    firePower: number
    isExplode: boolean
    isMounting: boolean

    static MAX_FIRE_POWER: number = 3

    constructor(tetrisOrFigure: ITetris | Figure, bonus: Bonus, type?: FigureType){

        if(tetrisOrFigure instanceof Figure)
            super(tetrisOrFigure)
        else{
            type = type || FigureType.I
            super(tetrisOrFigure, type)
        }

        this.isMounting = true
        this.bonus = bonus
        this.firePower = 0
        this.isExplode = false
        if(bonus == Bonus.FIRE)
            this.firePower = BonusFigure.MAX_FIRE_POWER

    }

    mount() {
        if(!this.isMounting)
            return
        super.mount();
    }



    nextStep(): boolean {

        const nextFire = (mayFall: boolean): boolean =>{
            if(!mayFall && this.firePower != 0){
                this.moveDown()
                this.firePower -= 1
                return true
            }
            if(this.firePower == 0){
                this.isMounting = false
                return false
            }

            return mayFall
        }
        const nextBomb = (mayFall: boolean): boolean =>{
            if(!mayFall && !this.isExplode){
                this.points.forEach(point=>{
                    FieldService.clearArea(this.tetris.field, point, 2)
                })
                this.isExplode = true
                this.isMounting = false
            }

            return mayFall
        }
        //TODO: stop on end field??
        let mayFall = super.nextStep();

        switch(this.bonus){
            case Bonus.BOMB:
                mayFall = nextBomb(mayFall)
                break;
            case Bonus.FIRE:
                mayFall = nextFire(mayFall)
                break;
            case Bonus.CHANGER:
                break;

        }

        return mayFall
    }



}

export default BonusFigure