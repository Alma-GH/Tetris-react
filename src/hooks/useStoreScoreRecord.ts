import {useEffect} from "react";
import {S_RECORD} from "../tools/const";


export const useStoreScoreRecord = (score: number): void =>{

    useEffect(()=>{

        const record = localStorage.getItem(S_RECORD)
        if(record == null)
            localStorage.setItem(S_RECORD, String(score))
        else{
            if(+record < score)
                localStorage.setItem(S_RECORD, String(score))
        }


    }, [score])


}