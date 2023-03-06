import Figure from "./Figure";
import {Bonus, FigureType} from "../../types/enums";
import {ITetris} from "../../types/tetris";
import FieldService from "./FieldService";
import {valueCellMap} from "../const";


class BonusFigure extends Figure{

    bonus: Bonus

    firePower: number
    isExplode: boolean
    rotateForChange: number

    clearColor: boolean
    isMounting: boolean

    static MAX_FIRE_POWER: number = 3
    static NUM_ROTATE_FOR_CHANGE: number = 4
    static FIGURE_TYPES: FigureType[] = [
        FigureType.I,
        FigureType.O,
        FigureType.J,
        FigureType.L,
        FigureType.S,
        FigureType.Z,
        FigureType.T,
    ]

    constructor(tetrisOrFigure: ITetris | Figure, bonus: Bonus, type?: FigureType){

        if(tetrisOrFigure instanceof Figure)
            super(tetrisOrFigure)
        else{
            type = type || FigureType.I
            super(tetrisOrFigure, type)
        }

        this.isMounting = true
        this.clearColor = false

        this.bonus = bonus
        this.firePower = BonusFigure.MAX_FIRE_POWER
        this.isExplode = false
        this.rotateForChange = BonusFigure.NUM_ROTATE_FOR_CHANGE

    }

    mount() {
        if(!this.isMounting)
            return
        super.mount();
        if(this.clearColor){
            FieldService.setValByPoints(
                this.tetris.field,
                valueCellMap.OCCUPIED,
                this.points
            )
        }
    }

    nextFire(mayFall: boolean): boolean{
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
    nextBomb(mayFall: boolean): boolean{
        if(!mayFall && !this.isExplode){
            this.points.forEach(point=>{
                FieldService.clearArea(this.tetris.field, point, 2)
            })
            this.isExplode = true
            this.isMounting = false
        }

        return mayFall
    }
    nextChanger(mayFall: boolean): boolean{

        if(!mayFall){
            this.clearColor = true
        }

        return mayFall
    }

    nextStep(): boolean {

        //TODO: stop on end field??
        let mayFall = super.nextStep();

        switch(this.bonus){
            case Bonus.BOMB:
                mayFall = this.nextBomb(mayFall)
                break;
            case Bonus.FIRE:
                mayFall = this.nextFire(mayFall)
                break;
            case Bonus.CHANGER:
                mayFall = this.nextChanger(mayFall)
                break;

        }

        return mayFall
    }


    rotate90(): boolean {
        if(this.bonus == Bonus.CHANGER){
            this.rotateForChange -= 1
            if(this.rotateForChange == 0){
                this.rotateForChange = BonusFigure.NUM_ROTATE_FOR_CHANGE
                this.unmount()
                this.nextType()
                this.setStartPointsByType()
                // this.mount()
            }
        }
        return super.rotate90();
    }

    nextType(): void{
        const type = this.type
        const numTypes = BonusFigure.FIGURE_TYPES.length

        const index = BonusFigure.FIGURE_TYPES.indexOf(type)
        this.type = BonusFigure.FIGURE_TYPES[(index+1) % numTypes]
    }

}

export default BonusFigure