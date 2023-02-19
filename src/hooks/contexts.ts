import {useContext} from "react";
import {StateContext} from "../context/contexts";


export const useStateContext = () => useContext(StateContext)