/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
/* import { useUser } from "./userContext"; */

type MovementsContextProviderProps = {
   children: React.ReactNode
}

type MovementsContextType = [
   movements: number[],
   setMovements: React.Dispatch<React.SetStateAction<number[]>>
]

const MovementsContext = React.createContext<MovementsContextType | null>(null)

const MovementsContextProvider = function ({ children }: MovementsContextProviderProps) {
   /* const { movements: initialMovements } = useUser();  */
   const [movements, setMovements] = React.useState([10, 20, 30])

   return (
      <MovementsContext.Provider value={[movements, setMovements]}>
         {children}
      </MovementsContext.Provider>
   )
}

const useMovements = function () {
   const context = React.useContext(MovementsContext)
   if (!context) {
      throw new Error('useMovements should be used inside the MovementsContextProvider')
   }
   return context
}

/* export { MovementsContextProvider, useMovements } */