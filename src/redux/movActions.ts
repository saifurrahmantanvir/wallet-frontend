import { GET_MOVEMENTS, REMOVE_MOVEMENTS } from "./actionTypes"
import { Movement } from '../global.types'

export const setMovements = (movements: Movement[]) => {
   return { type: GET_MOVEMENTS, payload: movements }
}

export const getMovements = (account: number) => async (dispatch: any) => {
   try {
      const response = await fetch(`https://wallet-tanvir.onrender.com/api/movements/${account}`)

      const { status, ...data } = await response.json()
      if (status === 'fail') throw data

      const { data: { movements } } = data

      localStorage.setItem('movements', JSON.stringify(movements))

      dispatch({ type: GET_MOVEMENTS, payload: movements })

   } catch ({ message }: any) {
      console.log(message)
   }
}

export const removeMovements = () => {
   localStorage.removeItem('movements')

   return { type: REMOVE_MOVEMENTS }
}