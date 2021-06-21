import { ADD_TASK, GET_TASKS, UPDATE_NAME, UPDATE_TYPE } from "./types"
import axios from 'axios'

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

export const getTasks = () => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8050/api/task/all`)
    console.log(res)
    dispatch( {
      type: GET_TASKS,
      payload: res.data.Payload
    })
  } catch(e) {
    console.log(e)
  }
}