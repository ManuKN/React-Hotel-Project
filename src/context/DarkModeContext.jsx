import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState"
import { useContext } from "react";

const DarkModeContext = createContext()

function DarkModeProvider({children}){
    const[isdarkMode , setIsDarkMode] = useLocalStorageState(window.matchMedia('(prefers-color-scheme:dark)').matches , 'isDarkMode');

   useEffect(function(){
      if(isdarkMode)
      {
        document.documentElement.classList.add('dark-mode')
        document.documentElement.classList.remove('light-mode')
      }
      else{
        document.documentElement.classList.add('light-mode')
        document.documentElement.classList.remove('dark-mode')
      }
   },[isdarkMode])

    function toogleDarkMode(){
        setIsDarkMode((isDark) => !isDark)
    }

     return(
        <DarkModeContext.Provider value={{isdarkMode , toogleDarkMode}}>
         {children}
        </DarkModeContext.Provider>
 
     )
}

function useDarkMode(){
    const context = useContext(DarkModeContext);
    if(context === 'undefined') throw new Error("DarkModecontext was used outside of then provider")
    return context;
}

export {DarkModeProvider , useDarkMode}