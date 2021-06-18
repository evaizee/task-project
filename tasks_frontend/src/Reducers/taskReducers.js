import { ADD_TASK, UPDATE_NAME, UPDATE_TYPE } from "../Actions/types"

const initialState = {
    tasks: [
        {id: 1, name:"Read book",type:"1", color: "red", isEdit:false},
        {id: 2, name:"Pay bills", type:"1", color:"green", isEdit:false},
        {id: 3, name:"Go to the gym", type:"2", color:"blue", isEdit:false},
        {id: 4, name:"Play baseball with us", type:"2", color:"green", isEdit:false}
    ]
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
      default:
        return state
    }
}