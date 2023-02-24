import {Field, IScoreMap, ITetris, Point} from "../../types/tetris";
import {FigureType} from "../../types/enums";
import Figure from "./Figure";
import {randomEnum} from "../utils";
import {SIZE_W_FIELD} from "../const";

class TetrisService {

    tetris: ITetris | null = null
    curFigure: Figure | null = null
    tick: number = 1000
    timer: number | undefined = undefined

    static readonly scoreMap: IScoreMap = {
        1: 100,
        2: 300,
        3: 700,
        4: 1500
    }

    private static randomFigureType(): FigureType{
        return randomEnum(FigureType)
    }
    private static setValByPoints(val: number, points: Point[], field: Field): void {
        for(let i = 0; i < points.length; i++) {
            const point = points[i]
            field[point.y][point.x] = val
        }
    }

    //tick
    private checkSpawn(): boolean{
        if(this.tetris == null)
            return false

        let isOk = true

        this.curFigure?.points.forEach(point=>{
            if(!this.isPointNotOccupied(point)){
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

    clearFullLines(): void{
        if(this.tetris == null || !this.tetris.inProgress)
            return

        //TODO: optimize (numLines)
        let numLines = 0
        for(let i = this.tetris.field.length - 1; i >= 0; i--) {
            const line = this.tetris.field[i]
            const isFull = line.every(cell=>cell!=0)

            if(isFull){
                numLines += 1
                this.tetris.field.splice(i, 1)
                this.tetris.field.unshift(new Array(SIZE_W_FIELD).fill(0))
                i++
            }
        }
        this.countScore(numLines)
    }
    countScore(lines: number): void{
        if(this.tetris == null)
            return

        if([1,2,3,4].includes(lines))
            this.tetris.score += TetrisService.scoreMap[lines]
    }

    startGame(): void{
        if(this.tetris == null)
            return

        this.stopGame()

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
    private isPointOnField(point: Point): boolean{
        if(this.tetris == null)
            return false

        const x = point.x
        const y = point.y

        return !(
            y < 0 ||
            x < 0 ||
            y >= this.tetris.field.length ||
            x >= this.tetris.field[0].length
        );
    }
    private isPointNotOccupied(point: Point): boolean{
        if(this.tetris == null)
            return false

        const x = point.x
        const y = point.y

        return y<0 || this.tetris.field[y][x] == 0 || this.tetris.field[y][x] == 2
    }

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
        const pointsOnField = points.filter(point=>this.isPointOnField(point))

        const potentialFigure = new Figure(this.curFigure)
        while(potentialFigure.nextStep()){}
        const potentialPoints: Point[] = potentialFigure.points

        const potentialPointsOnField = potentialPoints.filter(point=>this.isPointOnField(point))
        TetrisService.setValByPoints(2, potentialPointsOnField, field)
        TetrisService.setValByPoints(1, pointsOnField, field)
    }
    private unmountFigure(): void {
        if(this.tetris == null || this.curFigure == null)
            return

        const field = this.tetris.field
        const points = this.curFigure.points
        const pointsOnField = points.filter(point=>this.isPointOnField(point))
        TetrisService.setValByPoints(0, pointsOnField, field)

        //clear all potential points
        field.forEach(row=>{
            row.forEach((v, ind)=>{
                if(row[ind] == 2)
                    row[ind] = 0
            })
        })
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