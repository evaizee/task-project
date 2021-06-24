import { ADD_TASK, GET_TASKS, UPDATE_NAME, UPDATE_TYPE } from "./types"
import axios from 'axios'
import qs from 'qs'

export const addTask = task => {
  return {
    type: ADD_TASK,
    payload: task,
  }
}

export const updateName = (id, name, type) => async dispatch => {
  try{
    let data = qs.stringify({
      name: name,
      type: type,
    })

    await axios({
      method: 'put',
      url: `http://localhost:8050/api/task/${id}`,
      data: data,
      headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
    })

    dispatch( {
      type: UPDATE_NAME,
      name,
      id
    })
  } catch(err) {
    return Promise.reject(err)
  }
}

export const updateType = (id, name, status) => async dispatch => {
  try{
    let data = qs.stringify({
      name: name,
      type: status,
    })

    await axios({
      method: 'put',
      url: `http://localhost:8050/api/task/${id}`,
      data: data,
      headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
    })

    dispatch( {
      type: UPDATE_TYPE,
      status,
      id
    })
  } catch(err) {
    return Promise.reject(err)
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
    Promise.reject(e)
  }
}