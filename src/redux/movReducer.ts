import { GET_MOVEMENTS, REMOVE_MOVEMENTS } from './actionTypes'
import { Movement } from '../global.types'

type ActionType = {
   type: string
   payload: Movement[]
}

export type MovementsStateType = {
   movements: Movement[]
}

const initialState = {
   movements: []
}

const movementsReducer = function (state: MovementsStateType = initialState, action: ActionType) {
   switch (action.type) {
      case GET_MOVEMENTS:
         return {
            movements: action.payload
         }

      case REMOVE_MOVEMENTS:
         return initialState;

      default:
         return state
   }
}

export default movementsReducer