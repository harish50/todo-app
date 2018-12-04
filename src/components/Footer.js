import React,{Component} from 'react';

class Footer extends Component{
    render(){
        let clearCompleted = this.props.activeTasksCount ? <li><button>Clear Completed</button></li>:<div></div>;
        return(
            <footer>
                <ul>
                    <li><button onClick={this.props.handleShown}>All</button></li>
                    <li><button onClick={this.props.handleShown}>Active</button></li>
                    <li><button onClick={this.props.handleShown}>Completed</button></li>
                    {clearCompleted}
                </ul>
            </footer>
        )
    }
}

export default Footer;