import React, {Component} from 'react';

class InputTaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: ''
        };
        this.keyPress = this.keyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    keyPress(pressedKey) {
        if (pressedKey.keyCode === 13) {
            if (this.state.taskName) {
                const newTask = {
                    taskName: this.state.taskName,
                    isCompleted: false
                };
                this.setState({taskName: ''});
                this.props.addTask(newTask);
            }
        }
    }

    handleChange(event) {
        this.setState({taskName: event.target.value});
    }

    render() {
        return (
            <div>
                <input
                    className={"new-todo"}
                    type="text"
                    value={this.state.taskName}
                    placeholder={"what needs to be done?"}
                    onChange={this.handleChange}
                    onKeyDown={this.keyPress}
                />
            </div>
        );
    }
}

export default InputTaker;