import {IScoreMap, ITetris, Point} from "../../types/tetris";
import {FigureType} from "../../types/enums";
import Figure from "./Figure";
import {randomEnum} from "../utils";
import FieldService from "./FieldService";
import {valueCellMap} from "../const";

class TetrisService {

    tetris: ITetris | null = null
    curFigure: Figure | null = null
    tick: number = 1000
    timer: number | undefined = undefined

    variableDifficulty: boolean = false

    static readonly scoreMap: IScoreMap = {
        1: 100,
        2: 300,
        3: 700,
        4: 1500
    }

    private static randomFigureType(): FigureType{
        return randomEnum(FigureType)
    }


    //check
    private getCheckedTetris(): ITetris | never {
        if(this.tetris == null)
            throw new Error("NULL TETRIS")
        else
            return this.tetris
    }
    private checkSpawn(): boolean{
        if(this.tetris == null)
            return false

        const tetris = this.tetris
        let isOk = true

        this.curFigure?.points.forEach(point=>{
            if(!FieldService.isPointNotOccupied(tetris.field, point)){
                isOk = false
            }
        })

        return isOk;
    }
    private checkEmptyZone(): boolean {

        const tetris = this.getCheckedTetris()
        const field = tetris.field

        return !FieldService.emptyZoneNotEmpty(field)

    }

    //tick
    private startTicks(newFigure: boolean = true): void {
        this.stopTicks()

        if(newFigure)
            this.firstTick()

        this.timer = setInterval(()=>{
            if(!this.nextTick()){

                if(!this.checkEmptyZone()){
                    this.stopGame()
                }

                this.clearFullLines()
                this.firstTick()
            }

        }, this.tick)
    }
    private stopTicks(): void {
        clearInterval(this.timer)
    }
    private firstTick(): void{
        if(!this.tetris?.inProgress)
            return
        console.log("START TICK")
        this.changeFigure()
        this.mountFigure()
    }
    private nextTick(): boolean{
        console.log("NEXT TICK")
        const mayFall = this.fallFigure()
        return mayFall;
    }


    //tetris
    setTetris(newTetris: ITetris): void{
        this.tetris = newTetris
    }
    getTetris(): ITetris | null{
        return this.tetris
    }

    startGame(variableDifficulty: boolean): void{
        if(this.tetris == null)
            return

        this.stopGame()

        this.variableDifficulty = variableDifficulty
        this.tick = 1000
        this.tetris.onPause = false
        this.tetris.inProgress = true
        this.tetris.nextFigure = TetrisService.randomFigureType()

        this.startTicks()
    }
    stopGame(): void{
        this.stopTicks()
        if(this.tetris)
            this.tetris.inProgress = false
    }
    pause(): void {
        if(this.tetris == null)
            return

        this.stopTicks()
        this.tetris.onPause = true
    }
    unpause(): void {
        if(this.tetris == null)
            return

        this.startTicks(false)
        this.tetris.onPause = false
    }

    setDifficultyByScore(): void{
        if(this.tetris == null)
            return

        // const scoresDev = [3000, 1000, 350, 100]
        const scores = [30000, 10000, 3500, 1000]
        const ticks = [350, 500, 650, 800]

        for(let i = 0; i < 4; i++) {
            if(this.tetris.score > scores[i]){
                this.tick = ticks[i]
                break
            }
        }
    }
    clearFullLines(): void{
        if(this.tetris == null || !this.tetris.inProgress)
            return

        let numLines = FieldService.shiftFullRows(this.tetris.field)
        this.countScore(numLines)
        if(this.variableDifficulty)
            this.setDifficultyByScore()
    }
    countScore(lines: number): void{
        if(this.tetris == null)
            return

        if([1,2,3,4].includes(lines))
            this.tetris.score += TetrisService.scoreMap[lines]
    }


    //control figure
    private changeFigure(): void {
        if(this.tetris == null)
            return

        this.curFigure = new Figure(this.tetris, this.tetris.nextFigure)
        this.tetris.nextFigure = TetrisService.randomFigureType()
    }
    private mountFigure(): void {
        if(this.tetris == null || this.curFigure == null)
            return

        const field = this.tetris.field
        const points = this.curFigure.points
        const pointsOnField = points.filter(point=>FieldService.isPointOnField(field,point))

        const potentialFigure = new Figure(this.curFigure)
        while(potentialFigure.nextStep()){}
        const potentialPoints: Point[] = potentialFigure.points

        const potentialPointsOnField = potentialPoints.filter(point=>FieldService.isPointOnField(field,point))


        FieldService.setValByPoints(field, valueCellMap.POT, potentialPointsOnField)
        FieldService.setValByPoints(field, valueCellMap.OCCUPIED, pointsOnField)
    }
    private unmountFigure(): void {
        if(this.tetris == null || this.curFigure == null)
            return

        const field = this.tetris.field
        const points = this.curFigure.points
        const pointsOnField = points.filter(point=>FieldService.isPointOnField(field,point))
        const pointsDEF = pointsOnField.filter(point=>point.y >= FieldService.heightEmpty())
        const pointsEMT = pointsOnField.filter(point=>point.y < FieldService.heightEmpty())

        FieldService.setValByPoints(field, valueCellMap.DEF, pointsDEF)
        FieldService.setValByPoints(field, valueCellMap.EMT, pointsEMT)

        FieldService.clearAllPotentialCell(field)
    }

    controlFigure(control: Function): unknown {
        if(!this.tetris?.inProgress || this.tetris.onPause)
            return null

        this.unmountFigure()
        const res = control()
        this.mountFigure()

        return res
    }
    fallFigure(): boolean{
        return <boolean>this.controlFigure(() => {
            return this.curFigure?.nextStep()
        })
    }
    dropFigure(): void {
        if(!this.tetris?.inProgress || this.tetris.onPause)
            return

        this.stopTicks()

        while(this.fallFigure()){}

        if(!this.checkEmptyZone()){
            this.stopGame()
        }

        this.clearFullLines()
        this.startTicks()
    }
    leftFigure(): void{
        this.controlFigure(()=>{
            if(!this.curFigure?.left())
                console.log("CANNOT LEFT")
        })
    }
    rightFigure(): void{
        this.controlFigure(()=>{
            if(!this.curFigure?.right())
                console.log("CANNOT RIGHT")
        })
    }
    rotateFigure(): void {
        this.controlFigure(()=>{
            if(!this.curFigure?.rotate90())
                console.log("CANNOT ROTATE")
        })
    }

}

export default new TetrisService()