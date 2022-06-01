import { combineReducers } from "redux";

import user from './userReducer'
import movements from './movReducer'

export default combineReducers({
   user,
   movements
})