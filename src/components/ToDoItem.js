import React, {Component} from 'react';

class ToDoItem extends Component {
    render() {
        return (
            <div>
                <input type="checkbox" checked={this.props.task.isCompleted} onChange={() => this.props.handleToggle(this.props.task)}/>
                <label htmlFor={"toggle"}>{this.props.task.taskName}</label>
                <button/>
                <input
                    id={"toggle"}
                    type={"text"}
                    defaultValue={this.props.task.taskName}
                    hidden={true}
                />
            </div>
        );
    }
}

export default ToDoItem;
