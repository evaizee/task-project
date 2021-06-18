import { ADD_TASK, UPDATE_NAME, UPDATE_TYPE } from "./types"

export const addTask = task => {
  return {
    type: ADD_TASK,
    payload: task,
  }
}

export const updateName = (id, name) => {
  return {
    type: UPDATE_NAME,
    name,
    id,
  }
}

export const updateType = (id, status) => {
  return {
    type: UPDATE_TYPE,
    status,
    id,
  }
}