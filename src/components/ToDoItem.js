import React, {Component} from 'react';

class ToDoItem extends Component {
    render() {
        return (
            <li className={this.props.task.isCompleted ? "completed" : ""}>
                <div className={"view"}>
                    <input
                        className={"toggle"}
                        type="checkbox"
                        checked={this.props.task.isCompleted}
                        onChange={() => this.props.handleToggle(this.props.task)}
                    />
                    <label htmlFor={"toggle"}>{this.props.task.taskName}</label>
                    <button
                        className={"destroy"}
                        onClick={() => this.props.deleteTask(this.props.task.key)}
                    />
                    <input
                        id={"toggle"}
                        type={"text"}
                        defaultValue={this.props.task.taskName}
                        hidden={true}
                    />
                </div>
            </li>
        );
    }
}

export default ToDoItem;
