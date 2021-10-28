import React, { Component } from "react";
import { ThemeContext } from "./App";

export default class Counter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            count: this.props.initialCount
        }
    }

    changeCount(amount) {
        //this.setState({ count: this.state.count + amount })  dont use when using previous state

        //use this version when referencing the old state
        this.setState(prevState => {
            return { count: prevState.count + amount }
        })
    }

    //context must have a function inside
    render() {
        return (
            <ThemeContext.Consumer>
                {style => (
                    <div>
                        <button style={style} onClick={() => this.changeCount(-1)}>-</button>
                        <span>{this.state.count}</span>
                        <button style={style} onClick={() => this.changeCount(+1)}>+</button>
                    </div>

                )}

            </ThemeContext.Consumer>

        )
    }
}