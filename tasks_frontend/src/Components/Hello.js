import React, { Component } from 'react';

export default class Hello extends Component {

    constructor(){
        super();
        this.state = {
            content: "Good Morning"
        };
        this.updateContent = this.updateContent.bind(this)
    }

    updateContent() {
        this.setState({
            content: "Good Afternoon (Updated)"
        });
    }

    render() {
        return (
            <div>
                <p>Hello darkness {this.props.message}</p>
                <button onClick={this.updateContent}>Click me!</button>
                <p> {this.state.content} </p>
            </div>
        )
    }
}