import {useEffect} from "react";
import TetrisService from "../tools/Services/TetrisService";


export const useControls = ()=>{

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
                    TetrisService.rotateFigure()
                    break;
                case "ArrowDown":
                    TetrisService.fallFigure()
                    break;
                case "Space":
                    console.log("SPACE")
                    TetrisService.dropFigure()
                    break;
            }
            press = true
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