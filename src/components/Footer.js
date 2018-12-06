import React, {Component} from 'react';

class Footer extends Component {
    render() {
        let clearCompleted = this.props.completedTasksCount ?
            <button className={"clear-completed"} onClick={this.props.clearCompleted}>Clear Completed</button> : "";
        let footer =
            this.props.completedTasksCount > 0 || this.props.activeTasksCount > 0 ?
                <footer className={"footer"}>
                    <span className={"todo-count"}>{this.props.activeTasksCount} items left</span>
                    <ul className={"filters"}>
                        <li>
                            <button onClick={this.props.handleShown}>All</button>
                        </li>
                        <li>
                            <button onClick={this.props.handleShown}>Active</button>
                        </li>
                        <li>
                            <button onClick={this.props.handleShown}>Completed</button>
                        </li>
                    </ul>
                    {clearCompleted}
                </footer> :
                <footer></footer>;
        return (
            footer
        )
    }
}

export default Footer;