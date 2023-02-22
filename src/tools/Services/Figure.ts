import {ITetris, Point, Rotate} from "../../types/tetris";
import {FigureType} from "../../types/enums";
import {SIZE_H_FIELD, SIZE_W_FIELD} from "../const";

const SIZE_START_AREA = 4
const pO = [
    [0,1,1,0],
    [0,1,1,0],
    [0,0,0,0],
    [0,0,0,0]
]
const pL = [
    [0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0]
]
const pJ = [
    [0,0,1,0],
    [0,0,1,0],
    [0,1,1,0],
    [0,0,0,0]
]
const pZ = [
    [0,0,1,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]
]
const pS = [
    [0,1,0,0],
    [0,1,1,0],
    [0,0,1,0],
    [0,0,0,0]
]
const pT = [
    [0,1,0,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]
]
const pI = [
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

const pOr1 = [
    [0,0,0,0],
    [0,0,0,0],
    [1,1,0,0],
    [1,1,0,0]
]

const pLr1 = [
    [0,0,0,0],
    [1,0,0,0],
    [1,0,0,0],
    [1,1,0,0]
]
const pLr2 = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,1,0],
    [1,1,1,0]
]
const pLr3 = [
    [0,0,0,0],
    [1,1,0,0],
    [0,1,0,0],
    [0,1,0,0]
]
const pLr4 = [
    [0,0,0,0],
    [0,0,0,0],
    [1,1,1,0],
    [1,0,0,0]
]

const pJr1 = [
    [0,0,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [1,1,0,0]
]
const pJr2 = [
    [0,0,0,0],
    [0,0,0,0],
    [1,1,1,0],
    [0,0,1,0]
]
const pJr3 = [
    [0,0,0,0],
    [1,1,0,0],
    [1,0,0,0],
    [1,0,0,0]
]
const pJr4 = [
    [0,0,0,0],
    [0,0,0,0],
    [1,0,0,0],
    [1,1,1,0]
]

const pZr1 = [
    [0,0,0,0],
    [0,1,0,0],
    [1,1,0,0],
    [1,0,0,0]
]
const pZr2 = [
    [0,0,0,0],
    [0,0,0,0],
    [1,1,0,0],
    [0,1,1,0]
]

const pSr1 = [
    [0,0,0,0],
    [1,0,0,0],
    [1,1,0,0],
    [0,1,0,0]
]
const pSr2 = [
    [0,0,0,0],
    [0,0,0,0],
    [0,1,1,0],
    [1,1,0,0]
]

const pTr1 = [
    [0,0,0,0],
    [1,0,0,0],
    [1,1,0,0],
    [1,0,0,0]
]
const pTr2 = [
    [0,0,0,0],
    [0,0,0,0],
    [0,1,0,0],
    [1,1,1,0]
]
const pTr3 = [
    [0,0,0,0],
    [0,1,0,0],
    [1,1,0,0],
    [0,1,0,0]
]
const pTr4 = [
    [0,0,0,0],
    [0,0,0,0],
    [1,1,1,0],
    [0,1,0,0]
]

const pIr1 = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [1,1,1,1]
]
const pIr2 = [
    [1,0,0,0],
    [1,0,0,0],
    [1,0,0,0],
    [1,0,0,0]
]

type TemplateDraw = number[][]

class Figure{

    tetris: ITetris

    type: FigureType
    rotate: Rotate

    points: Point[]
    // potentialPoints: Point[]
    mainPoint: Point

    constructor(tetris: ITetris, type: FigureType)
    constructor(figure: Figure)
    constructor(tetrisOrFigure: ITetris | Figure, type?: FigureType)
    {

        if(tetrisOrFigure instanceof Figure){
            const figure = tetrisOrFigure

            this.tetris = figure.tetris
            this.type = figure.type
            this.rotate = figure.rotate
            this.points = structuredClone(figure.points)
            // this.potentialPoints = structuredClone(figure.potentialPoints)
            this.mainPoint = {
                x: 0,
                y: 0
            }
        }else{
            const tetris = tetrisOrFigure

            this.tetris = tetris
            this.type = type ? type : FigureType.I
            this.rotate = 1
            this.points = []
            // this.potentialPoints = []
            this.mainPoint = {
                x: 0,
                y: 0
            }

            this.setStartPointsByType()
        }

    }


    private static templateByRotate(
        rotate: Rotate,
        rotate1: TemplateDraw,
        rotate2: TemplateDraw,
        rotate3: TemplateDraw,
        rotate4: TemplateDraw
    ): TemplateDraw{
        if(rotate == 1)
            return rotate1
        if(rotate == 2)
            return rotate2
        if(rotate == 3)
            return rotate3
        if(rotate == 4)
            return rotate4

        return rotate1
    }
    private static templateByRotateAndType(rotate: Rotate, type: FigureType): TemplateDraw{

        switch(type){
            case FigureType.O:
                return pOr1
            case FigureType.L:
                return Figure.templateByRotate(rotate, pLr1, pLr2, pLr3, pLr4)
            case FigureType.J:
                return Figure.templateByRotate(rotate, pJr1, pJr2, pJr3, pJr4)
            case FigureType.Z:
                return Figure.templateByRotate(rotate, pZr1, pZr2, pZr1, pZr2)
            case FigureType.S:
                return Figure.templateByRotate(rotate, pSr1, pSr2, pSr1, pSr2);
            case FigureType.T:
                return Figure.templateByRotate(rotate, pTr1, pTr2, pTr3, pTr4);
            case FigureType.I:
                return Figure.templateByRotate(rotate, pIr1, pIr2, pIr1, pIr2);

        }
    }

    private isPointPossible(point: Point): boolean{
        if(this.tetris == null)
            return false

        const x = point.x
        const y = point.y

        return !(
            // y < 0 ||
            x < 0 ||
            y >= this.tetris.field.length ||
            x >= this.tetris.field[0].length ||
            (y >= 0 && this.tetris.field[y][x] != 0)
        );
    }

    private clearPoints(): void {
        this.points = []
        this.mainPoint = {
            x: 0,
            y: 0
        }
    }
    private setPoints(arr: number[][], startX: number, startY: number): void{

        let minX = Infinity
        let maxY = -Infinity
        for(let i = 0; i < SIZE_START_AREA; i++) {
            for(let j = 0; j < SIZE_START_AREA; j++) {
                if(arr[i][j]){
                    const newY = startY + i
                    const newX = startX + j
                    this.points.push({
                        y: newY,
                        x: newX
                    })

                    maxY = Math.max(maxY, newY)
                    minX = Math.min(minX, newX)
                }
            }
        }

        if(maxY != -Infinity && minX != Infinity){
            this.mainPoint = {
                x: minX,
                y: maxY
            }
        }

    }
    private setStartPoints(arr: number[][]): void{
        const startY = 0
        const startX = 3
        this.setPoints(arr, startX, startY)
    }
    private setStartPointsByType(): void{

        switch(this.type){
            case FigureType.O:
                this.setStartPoints(pO)
                break;
            case FigureType.L:
                this.setStartPoints(pL)
                break;
            case FigureType.J:
                this.setStartPoints(pJ)
                break;
            case FigureType.Z:
                this.setStartPoints(pZ)
                break;
            case FigureType.S:
                this.setStartPoints(pS)
                break;
            case FigureType.T:
                this.setStartPoints(pT)
                break;
            case FigureType.I:
                this.setStartPoints(pI)
                break;

        }
    }

    nextStep(): boolean{

        const field = this.tetris.field
        const ps = this.points

        for(let i = 0; i < ps.length; i++) {
            const point = ps[i]
            const nextInd = point.y+1

            const end = nextInd >= SIZE_H_FIELD
            if(end)
                return false

            const occupied = nextInd>=0 && field[nextInd][point.x] != 0
            if(occupied)
                return false

        }

        ps.forEach(point=>{
            //love you
            //me too
            point.y += 1
        })
        this.mainPoint.y += 1

        return true
    }

    left(): boolean{
        const field = this.tetris.field
        const ps = this.points

        for(let i = 0; i < ps.length; i++) {
            const point = ps[i]
            const nextInd = point.x-1

            const end = nextInd < 0
            if(end)
                return false

            const occupied = point.y>=0 && field[point.y][nextInd] != 0
            if(occupied)
                return false

        }

        ps.forEach(point=>{
            point.x -= 1
        })
        this.mainPoint.x -= 1

        return true
    }
    right(): boolean{
        const field = this.tetris.field
        const ps = this.points

        for(let i = 0; i < ps.length; i++) {
            const point = ps[i]
            const nextInd = point.x+1

            const end = nextInd >= SIZE_W_FIELD
            if(end)
                return false

            const occupied = point.y>=0 && field[point.y][nextInd] != 0
            if(occupied)
                return false

        }

        ps.forEach(point=>{
            point.x += 1
        })
        this.mainPoint.x += 1

        return true
    }

    rotate90(): boolean{

        this.rotate = <Rotate>(this.rotate % 4 + 1)
        const newRotate = this.rotate
        const type = this.type
        const template = Figure.templateByRotateAndType(newRotate, type)
        const main = this.mainPoint

        const tmpPoints = this.points
        this.clearPoints()
        this.setPoints(template, main.x, main.y - 3)

        //TODO: multi rotate
        for(let i = 0; i < this.points.length; i++) {
            const point = this.points[i]
            if(!this.isPointPossible(point)){
                this.points = tmpPoints
                this.rotate -= 1
                return false
            }

        }

        return true
    }




}

export default Figure