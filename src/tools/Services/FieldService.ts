import {Cell, Field, Point} from "../../types/tetris";
import {DEF_EMPTY_FIELD, DEF_EMPTY_START_FIELD, valueCellMap} from "../const";

class FieldService{


    SIZE_H_FIELD = DEF_EMPTY_FIELD.length
    SIZE_W_FIELD = DEF_EMPTY_FIELD[0].length

    SIZE_H_FIELD_START = DEF_EMPTY_START_FIELD.length

    heightEmpty(){
        return this.SIZE_H_FIELD_START
    }
    heightPlayable(){
        return this.SIZE_H_FIELD - this.SIZE_H_FIELD_START
    }
    isFreeCell(cell: Cell): boolean{
        return (
            cell == valueCellMap.DEF ||
            cell == valueCellMap.POT ||
            cell == valueCellMap.EMT
        )
    }

    clearField(field: Field): void {

        const hEmpty = this.heightEmpty()

        for(let i = 0; i < hEmpty; i++) {
            for(let j = 0; j < field[i].length; j++) {
                field[i][j] = valueCellMap.EMT
            }
        }

        for(let i = hEmpty; i < field.length; i++) {
            for(let j = 0; j < field[i].length; j++) {
                field[i][j] = valueCellMap.DEF
            }
        }


    }
    clearAllPotentialCell(field: Field): void {

        const hEmpty = this.heightEmpty()

        for(let i = 0; i < field.length; i++) {
            for(let j = 0; j < field[i].length; j++) {
                if(field[i][j] != valueCellMap.POT)
                    continue

                if(i<hEmpty)
                    field[i][j] = valueCellMap.EMT
                else
                    field[i][j] = valueCellMap.DEF
            }
        }
    }


    shiftRow(field: Field, row: number): void {

        const hEmpty = this.heightEmpty()

        if(row < hEmpty)
            return

        field.splice(row, 1)
        const emptyField = field.splice(0, hEmpty)
        field.unshift(new Array(this.SIZE_W_FIELD).fill(valueCellMap.DEF))
        field.unshift(...emptyField)
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

    emptyZoneNotEmpty(field: Field): boolean {

        const hEmpty = this.heightEmpty()

        for(let i = 0; i < hEmpty; i++) {
            for(let j = 0; j < field[i].length; j++) {
                if(!this.isFreeCell(field[i][j]))
                    return true
            }
        }

        return false
    }


}


export default new FieldService()