import {useEffect} from "react";
import TetrisService from "../tools/Services/TetrisService";


export const useTetrisControls = (): void =>{

    useEffect(()=>{

        let press = false
        const control = (e: KeyboardEvent)=>{
            if(press)
                return

            switch(e.code){
                case "ArrowLeft":
                    TetrisService.leftFigure()
                    break;
                case "ArrowRight":
                    TetrisService.rightFigure()
                    break;
                case "ArrowUp":
                    press = true
                    TetrisService.rotateFigure()
                    break;
                case "ArrowDown":
                    // press = true
                    TetrisService.fallFigure()
                    break;
                case "Space":
                    press = true
                    TetrisService.dropFigure()
                    break;
                case "ControlLeft":
                    press = true
                    TetrisService.useBonus()
            }
        }
        const controlOff = (e: KeyboardEvent)=>{
            press = false
        }


        document.addEventListener("keyup", controlOff)
        document.addEventListener("keydown", control)

        return ()=>{
            document.removeEventListener("keydown", control)
            document.removeEventListener("keyup", controlOff)
        }

    }, [])

}