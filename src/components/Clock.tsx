import React from 'react'
import {formatClock} from '../utils/extract'

interface ClockState {
    date: Date
}

class Clock extends React.Component<{}, {date: Date}> {
    timerId: any
    constructor(props: {}) {
        super(props)
        this.timerId = 0
        this.state = {date: new Date()}
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    tick() {
        this.setState({date: new Date()})
    }

    render() {
        return (
            <div className="time">
                {formatClock(this.state.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))}
            </div>
            
        )
    }
}

export default Clock