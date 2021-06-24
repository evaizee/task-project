import { ADD_TASK, GET_TASKS, UPDATE_NAME, UPDATE_TYPE } from "../Actions/types"

const initialState = {
    tasks: [],
    loading: true,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK:
            return {
               tasks:[action.payload, ...state.tasks]
            }
        case UPDATE_NAME:
            console.log("update name")
            console.log(action)
            return {
                tasks: state.tasks.map((task) => 
                    task._id === action.id
                    ? { ...task, name: action.name}
                    : task
                ),
                loading: false
            }
        case UPDATE_TYPE:
            console.log("update type")

            return {
                tasks: state.tasks.map((task) => 
                    task._id === action.id
                    ? { ...task, type: action.status}
                    : task
                ),
                loading: false
            }
        case GET_TASKS:
            console.log("get tasks")
            return {
                ...state,
                tasks: action.payload,
                loading: false,
            }
      default:
        return state
    }
}