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
            console.log("update task")

            return {
                tasks: state.tasks.map((task) => 
                    task.id === action.id
                    ? { ...task, name: action.name}
                    : task
                )
            }
        case UPDATE_TYPE:
            console.log("update task")

            return {
                tasks: state.tasks.map((task) => 
                    task.id === action.id
                    ? { ...task, type: action.status}
                    : task
                )
            }
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false,
            }
      default:
        return state
    }
}