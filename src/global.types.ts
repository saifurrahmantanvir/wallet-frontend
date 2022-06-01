import { UserStateType } from "./redux/userReducer"
import { MovementsStateType } from "./redux/movReducer"

export type User = {
   name: string,
   account: number | null
}


export type Movement = {
   movement: number,
   madeAt: Date
}


export type ReduxStateType = {
   user: UserStateType,
   movements: MovementsStateType
}


export type LoginState = 'loginStatus' | 'loggedIn' | 'notLoggedIn';

export type StatusType = 'success' | 'failed' | 'closed';