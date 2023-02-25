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

    //tick
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
    private startTicks(): void {
        this.stopTicks()

        this.firstTick()
        this.timer = setInterval(()=>{
            if(!this.nextTick()){
                this.clearFullLines()
                this.firstTick()
            }

        }, this.tick)
    }
    private stopTicks(): void {
        clearInterval(this.timer)
    }
    private firstTick(): boolean{
        if(this.tetris == null)
            return false

        console.log("START TICK")

        this.changeFigure()

        if(!this.checkSpawn()){
            this.stopGame()
            return false
        }

        this.mountFigure()

        return true
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

    startGame(variableDifficulty: boolean): void{
        if(this.tetris == null)
            return

        this.stopGame()

        this.variableDifficulty = variableDifficulty
        this.tick = 1000
        this.tetris.inProgress = true
        this.tetris.nextFigure = TetrisService.randomFigureType()

        this.startTicks()
    }
    stopGame(): void{
        this.stopTicks()
        if(this.tetris)
            this.tetris.inProgress = false
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
        FieldService.setValByPoints(field, valueCellMap.Y, pointsOnField)
    }
    private unmountFigure(): void {
        if(this.tetris == null || this.curFigure == null)
            return

        const field = this.tetris.field
        const points = this.curFigure.points
        const pointsOnField = points.filter(point=>FieldService.isPointOnField(field,point))
        FieldService.setValByPoints(field, valueCellMap.DEF, pointsOnField)

        FieldService.clearAllPotentialCell(field)
    }

    controlFigure(control: Function): unknown {
        if(!this.tetris?.inProgress)
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
        if(!this.tetris?.inProgress)
            return

        this.stopTicks()
        let mayFall = this.fallFigure()
        while(mayFall)
            mayFall = this.fallFigure()
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