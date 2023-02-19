import {ITetris, Point} from "../../types/tetris";
import {FigureType} from "../../types/enums";

const SIZE = 4
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

class Figure{

    tetris: ITetris
    type: FigureType
    points: Point[]



    constructor(tetris: ITetris, type: FigureType) {
        this.tetris = tetris
        this.type = type
        this.points = []
        this.setStartPointsByType()
    }

    private setPoints(arr: number[][], startX: number, startY: number): void{
        for(let i = 0; i < SIZE; i++) {
            for(let j = 0; j < SIZE; j++) {
                if(arr[i][j]){
                    this.points.push({
                        y: startY + i,
                        x: startX + j
                    })
                }
            }
        }
    }
    private setStartPointsByType(): void{
        const startIndexY = 0
        const startIndexX = 0
        switch(this.type){
            case FigureType.O:
                this.setPoints(pO, startIndexX, startIndexY)
                break;
            case FigureType.L:
                this.setPoints(pL, startIndexX, startIndexY)
                break;
            case FigureType.J:
                this.setPoints(pJ, startIndexX, startIndexY)
                break;
            case FigureType.Z:
                this.setPoints(pZ, startIndexX, startIndexY)
                break;
            case FigureType.S:
                this.setPoints(pS, startIndexX, startIndexY)
                break;
            case FigureType.T:
                this.setPoints(pT, startIndexX, startIndexY)
                break;
            case FigureType.I:
                this.setPoints(pI, startIndexX, startIndexY)
                break;

        }
    }

    nextStep(): boolean{


        return true
    }

}

export default Figure