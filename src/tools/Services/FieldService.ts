import {Cell, Field, Point} from "../../types/tetris";
import {SIZE_W_FIELD, valueCellMap} from "../const";

class FieldService{


    isFreeCell(cell: Cell): boolean{
        return (
            cell == valueCellMap.DEF ||
            cell == valueCellMap.POT
        )
    }

    clearField(field: Field): void {
        for(let i = 0; i < field.length; i++) {
            for(let j = 0; j < field[i].length; j++) {
                field[i][j] = valueCellMap.DEF
            }
        }
    }
    clearAllPotentialCell(field: Field): void {
        for(let i = 0; i < field.length; i++) {
            for(let j = 0; j < field[i].length; j++) {
                if(field[i][j] == valueCellMap.POT)
                    field[i][j] = valueCellMap.DEF
            }
        }
    }
    shiftRow(field: Field, row: number): void {
        field.splice(row, 1)
        field.unshift(new Array(SIZE_W_FIELD).fill(valueCellMap.DEF))
    }

    shiftFullRows(field: Field): number {

        //TODO: optimize (numLines)
        let numRows = 0

        for(let i = field.length - 1; i >= 0; i--) {
            const row = field[i]
            const isFull = row.every(cell=>!this.isFreeCell(cell))

            if(isFull){
                numRows += 1
                this.shiftRow(field, i)
                i++
            }
        }

        return numRows
    }
    setValByPoints(field: Field, val: Cell, points: Point[]): void {
        for(let i = 0; i < points.length; i++) {
            const point = points[i]
            field[point.y][point.x] = val
        }
    }



    isPointOnField(field: Field, point: Point): boolean{
        const x = point.x
        const y = point.y

        return !(
            y < 0 ||
            x < 0 ||
            y >= field.length ||
            x >= field[0].length
        );
    }
    isPointNotOccupied(field: Field, point: Point): boolean{
        const x = point.x
        const y = point.y

        return y<0 || this.isFreeCell(field[y][x])
    }


}


export default new FieldService()