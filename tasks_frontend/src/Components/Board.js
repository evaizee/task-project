import React, { Component } from 'react';
import Task from './Task';
import { connect } from 'react-redux';
import { addTask, updateType, getTasks } from '../Actions/taskActions'
//import axios from 'axios'

const mapStateToProps = (state) => ({
    tasks: state.tasks,
    user: state.user,
    loading: state.loading
})

class Board extends Component {

    constructor() {
         super()
         this.onChange = this.onChange.bind(this);
         this.startCreateNew = this.startCreateNew.bind(this);
         this.state = {
            isCreateNew: false,
            nextId: 5,
            newTask: '',
            category: []
        }
    }

    componentDidMount() {
        this.props.getTasks()
    }

    onDragOver = (event) => {
	    event.preventDefault();
	}

    onDrop = (event, taskType) => {
        let id = (event.dataTransfer.getData("id"))
        let status = parseInt(event.dataTransfer.getData("status"))
        let name = (event.dataTransfer.getData("name"))
        console.log(id)
        console.log(name)
        this.props.updateType(id, name, taskType)
    }

    startCreateNew (task_type) {
        const task = {id: this.state.nextId, name:this.state.newTask, type:task_type, color:"green", isEdit:false}
        this.props.addTask(task)
        this.setState({
            nextId: this.state.nextId + 1,
            newTask: "",
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        var taskIds = [
            {'id': 9, 'type': 'done'},
            {'id': 5, 'type': 'inProgress'}
        ];

        var classifiedTasks = []
        
        taskIds.forEach ((taskId) => {
            classifiedTasks[taskId.id] = []
        })

        if (this.props.loading === false) {
            console.log(this.props.tasks)
            this.props.tasks.forEach ((task) => {
                console.log(task)
                classifiedTasks[task.type].push(
                    <Task key={task._id} {...task} updateName={this.props.updateTask} />
                )
            })

            var boardView = []

            taskIds.forEach ((taskId) => {
                boardView.push(
                    <div className="flex flex-col md:flex-col flex-nowrap mx-5 mb-4 px-4 mt-7" key={taskId.id} onDragOver={(event) => this.onDragOver(event)}
                    onDrop={(event) => this.onDrop(event, taskId.id)}>
                        {classifiedTasks[taskId.id]}
                        <div>
                            <textarea className="bg-gray-200 p-2 rounded mt-1 border-2 border-grey w-full focus:border-indigo-400 focus:bg-white" placeholder="input" name="newTask" onChange={this.onChange}></textarea>
                            <button className="newTaskButton" type="button" name="submit" onClick={(e) => this.startCreateNew(taskId.id)}>Create New Task</button>
                        </div>
                    </div>
                )
            })

        //console.log(boardView)
            return (
                <div>
                    <div className="flex flex-row">
                        <div className="flex flex-grow">
                            <input className="bg-gray-200 flex-grow appearance-none border-2 border-gray-200 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-grey-500" id="inline-full-name" type="text" placeholder="Insert title here"/>
                        </div>
                        <div className="flex flex-grow-none relative">
                            <select className="block appearance-none w-full bg-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>Sort by Date</option>
                                <option>Sort by Content</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                        <div className="flex flex-grow-none">
                            <input className="bg-red flex-grow appearance-none border-2 border-gray-200 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-grey-500" id="inline-full-name" type="text" placeholder="Search here" />
                        </div>
                        <div className="flex flex-grow-none">
                            <input className="bg-red flex-grow appearance-none border-2 border-gray-200 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-grey-500" id="inline-full-name" type="text" placeholder="Search here" />
                        </div>
                    </div>

                    <div className="flex flex-row md:flex-row">
                        {boardView}
                    </div>
                </div>
            )
        } else {
            console.log("loading")
            return (
                <div></div>
            )
        }
    }
}

export default connect(mapStateToProps, {addTask, updateType, getTasks}) (Board)