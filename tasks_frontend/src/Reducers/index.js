import { combineReducers } from "redux"
import taskReducers from "./taskReducers"
import userReducers from "./userReducers"

const allReducers = combineReducers({
  tasks: taskReducers,
  user: userReducers,
})

export default allReducers