import { GET_USER, REMOVE_USER, SET_STATUS } from "./actionTypes"
import { User } from '../global.types'

export const setUser = (user: User, token: string) => {
   return { type: GET_USER, payload: { user, token } }
}

export const setStatus = (message: string) => {
   return { type: SET_STATUS, payload: message }
}

export const getUser = (name: string, pin: string) => async (dispatch: any) => {
   try {
      const response = await fetch('https://wallet-tanvir.onrender.com/api/users/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ name, pin }),
         /* credentials: 'include' */
      })
      /* if (!response.ok) throw new Error('Please check your connection') */

      const { status, ...data } = await response.json()
      if (status === 'fail') throw data

      const { data: { user }, token } = data

      localStorage.setItem('user', JSON.stringify({ user, token }))

      dispatch({ type: GET_USER, payload: { user, token } })

   } catch ({ message }: any) {
      dispatch({ type: SET_STATUS, payload: message })
   }
}

export const removeUser = () => {
   localStorage.removeItem('user')

   return { type: REMOVE_USER }
}