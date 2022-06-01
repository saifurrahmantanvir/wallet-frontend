import { GET_USER, SET_STATUS, REMOVE_USER } from './actionTypes'
import { User } from '../global.types'

type ActionType = {
   type: string
   payload: {
      user: User
      token: string
   }
}

export type UserStateType = {
   status: string
   user: User
   token: string
}

const initialState = {
   status: '',
   user: { name: '', account: null },
   token: ''
}

const userReducer = function (state: UserStateType = initialState, action: ActionType) {
   switch (action.type) {
      case GET_USER:
         const { user, token } = action.payload;

         return {
            ...state,
            user,
            token,
            status: 'Login Successful'
         }

      case SET_STATUS:
         return {
            ...state,
            status: action.payload
         }

      case REMOVE_USER:
         return initialState;

      default:
         return state
   }
}

export default userReducer