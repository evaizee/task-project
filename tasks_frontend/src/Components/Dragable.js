import React, { Component } from 'react';
import DragableItem from './DragableItem';
import axios from 'axios'

export default class Dragable extends Component {

    // constructor() {
    //     super()
        
    // }

    state = {
        tasks: [
            {id: 1, name:"Read book",type:"inProgress", color: "red", isEdit:false},
            {id: 2, name:"Pay bills", type:"inProgress", color:"green", isEdit:false},
            {id: 3, name:"Go to the gym", type:"Done", color:"blue", isEdit:false},
            {id: 4, name:"Play baseball", type:"Done", color:"green", isEdit:false}
        ],
        isCreateNew: false,
        nextId: 5,
        additionals: []
    }

    componentDidMount() {
        axios.get("http://localhost:8050/api/task/6084a7edfd933b78dc5b9f76").then(res => {
            const data = res.data
            this.setState({additionals: data})
            console.log(this.state.additionals)
        })
    }

    onDragOver = (event) => {
	    event.preventDefault();
	}

    onDrop = (event, cat) => {
        let id = parseInt(event.dataTransfer.getData("id"));
        console.log("drop")
        console.log(id)
        console.log(cat)
        console.log(this.state.tasks)
        let tasks = this.state.tasks.filter((task) => {
                if (task.id === id) {
                    task.type = cat
                }
                return cat
            }
        );

        this.setState({
            ...this.state,
            tasks
        })
        //this.DragableItem
    }

    updateName = (id, name) => {
        let tasks = this.state.tasks.filter((task) => {
            if (task.id === id) {
                task.name = name
            }
            return name
        });
        this.setState({
            ...this.state,
            tasks
        })
    }

    startCreateNew = () => {
        let newTask = {id: this.state.nextId, name:"", type:"inProgress", color:"green", isEdit:true}
        let newTasks = this.state.tasks.concat(newTask)
        this.setState({
            tasks: newTasks,
            nextId: this.state.nextId + 1
        })
    }

    // endCreateNew = () => {
    //     this.setState({
    //         isCreateNew: false
    //     })
    // }

    render() {
        var tasks = {
            inProgress: [],
            Done: [],
        }

        this.state.tasks.forEach ((task) => {
            tasks[task.type].push(
                <DragableItem key={task.id} {...task} updateName={this.updateName} />
            )
        });

        return (
            <div className="drag-div">
                <h2 className="head">
                    List of Drag and Drop
                </h2>
                <div>
                    <button type="button" name="new-task" onClick={this.startCreateNew}>Create New Task</button>
                </div>
                <div className="inProgress"
                    onDragOver={(event) => this.onDragOver(event)}
                    onDrop={(event) => this.onDrop(event, "inProgress")}
                >
                    <span className="group-header">In Progress</span>
                    {tasks.inProgress}
                </div>
                <div className="droppable"
                    onDragOver={(event) => this.onDragOver(event)}
                    onDrop={(event) => this.onDrop(event, "Done")}
                >
                    <span className="group-header">Done</span>
                    {tasks.Done}
                </div>
            </div>
        )
    }
}