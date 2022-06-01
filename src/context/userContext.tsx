/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { accounts } from '../userData'

type UserContextProviderProps = {
   children: React.ReactNode
}

type UserContextType = {
   owner: string
   movements: number[]
   interestRate: number
   pin: number
}

const UserContext = React.createContext<UserContextType | null>(null);

const UserContextProvider = function ({ children }: UserContextProviderProps) {
   return (
      <UserContext.Provider value={accounts[1]}>
         {children}
      </UserContext.Provider>
   )
}

const useUser = function () {
   const context = React.useContext(UserContext)
   if (!context) {
      throw new Error('useUser should be used inside the UserContextProvider')
   }
   return context
}

/* export { UserContextProvider, useUser } */