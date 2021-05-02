import React, { Component } from 'react';

export default class Clock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        )
    }

    // componentWillUnmount() {

    // }

    tick() {
        this.setState({ date: new Date() });
    }

    render() {
        const element = (
            <div>
                <h2>Now is <span id="time-string"> {this.state.date.toLocaleTimeString()} </span></h2>
            </div>
        )
        return (element)
    }
}