import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateName } from '../Actions/taskActions'

const mapStateToProps = (state) => ({
    tasks: state.tasks,
    user: state.user,
})


class Task extends Component {

    constructor(props) {
        super()
         this.state = {
             id: props.id,
             isEdit: props.isEdit
        };

        this.endEdit = this.endEdit.bind(this)
        this.startEdit = this.startEdit.bind(this)
    }

    onDragStart = (event, id, taskType) => {
        console.log("drag start ", id, taskType)
        event.dataTransfer.setData("id", id)
        event.dataTransfer.setData("type", taskType)
    }

    startEdit () {
        console.log("click")
        this.setState({
            isEdit: true
        })
    }

    endEdit (id, name, type) {
        console.log(id)
        console.log(name)
        this.props.updateName(id, name, type)
        this.setState({
            isEdit: false
        })
    }

    onNameChange (value) {
        this.setState({
            name: value
        })
    }

    render() {
        let display
        let button
        if (this.state.isEdit === true) {
            display = <input type="text"  name="content-textarea" defaultValue={this.props.name} onChange={e => this.onNameChange(e.target.value)} />
            button = <button type="button" name="exit-edit-button" onClick={(e) => this.endEdit(this.props._id, this.state.name, this.props.type)}>Stop Edit</button>
        } else {
            display = this.props.name
            button = <button type="button" name="start-edit-button" onClick={this.startEdit}>Start Edit</button>
        }

        return(
            <div className="flex-container rounded-md mb-4 p-4" onDragStart = {(event) => this.onDragStart(event, this.props.id, this.props.type)} draggable>
                <div className="rounded bg-grey-light p-2 flex flex-col flex-grow">
                    <div className="flex justify-between py-1 flex-grow">
                        <h3 className="text-sm"> {display} </h3>
                        {button}
                        <svg className="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"/></svg>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, {updateName}) (Task)