import React, { Component } from 'react';

export default class DragableItem extends Component {

    constructor(props) {
        super()
         this.state = {
             id: props.id,
             isEdit: props.isEdit
        };

        this.endEdit = this.endEdit.bind(this)
        this.startEdit = this.startEdit.bind(this)
        //this.updateName = this.updateName.bind(this)
    }

    // componentDidMount() {
    //     this.setState({type: this.props.type, id:this.props.id, name:this.props.name, color:this.props.color})
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return (this.props.type !== nextProps.type) || (this.state.isEdit !== nextState.isEdit)
    // }

    onDragStart = (event, id, taskType) => {
        console.log("drag start ", id, taskType)
        event.dataTransfer.setData("id", id)
    }

    startEdit () {
        console.log("click")
        this.setState({
            isEdit: true
        })
    }

    endEdit () {
        this.setState({
            isEdit: false
        })
    }

    onNameChange (value) {
        this.setState({
            name: value
        })
        this.props.updateName(this.state.id, value)
    }

    render() {
        console.log("render ulang")
        let display
        let button
        console.log(this.state.isEdit)
        if (this.state.isEdit === true) {
            display = <input type="text"  name="content-textarea" defaultValue={this.props.name} onChange={e => this.onNameChange(e.target.value)} />
            button = <button type="button" name="exit-edit-button" onClick={this.endEdit}>Stop Edit</button>
        } else {
            display = this.props.name
            button = <button type="button" name="start-edit-button" onClick={this.startEdit}>Start Edit</button>
        }

        return(
            <div key={this.props.id}
                onDragStart = {(event) => this.onDragStart(event, this.props.id, this.props.type) }
                draggable
                className="draggable"
                style = {{backgroundColor: this.props.color}}
            >
                {display} <br></br>
                {button}
            </div>
        )
    }
}