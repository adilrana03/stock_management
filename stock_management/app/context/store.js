'use client'
import { createContext, useContext, useState } from 'react'

const myContext = createContext({
    name:"",
    count:""
})

export const GlobalContextProvider = ({children}) => {

    const [state, setState]=useState("Adil");



    return (
        <myContext.Provider value= {state} >
            {children}
        </myContext.Provider>
    )
}
export const useGlobalContext=() => useContext(myContext);
