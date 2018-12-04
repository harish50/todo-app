import React, {Component} from "react";
import Header from './Header';
import InputTaker from './InputTaker';
import ToDoItem from './ToDoItem';
import Footer from './Footer';
import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            nowShowing: 'All'
        };
        this.addTask = this.addTask.bind(this);
        this.handleShown = this.handleShown.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.activeTasksCount = this.activeTasksCount.bind(this);
    }

    addTask(newTask) {
        let previousTasks = this.state.tasks.slice();
        newTask['id'] = this.state.tasks.length;
        previousTasks.push(newTask);
        this.setState({tasks: previousTasks});
    }

    handleShown(action) {
        this.setState({nowShowing: action.target.textContent});
    }

    handleToggle(todo) {
        let taskIndex= this.state.tasks.indexOf(todo);
        console.log(taskIndex);
        let tasks = this.state.tasks.slice(0,taskIndex);
        let tasks1= this.state.tasks.slice(taskIndex+1);
        todo.isCompleted = !todo.isCompleted;
        tasks.push(todo);
        tasks.push(...tasks1);
        this.setState({tasks: [...tasks]});
    }

    activeTasksCount(){
        let completedCount=0;
        this.state.tasks.map(task=>{
            if(task.isCompleted){
                completedCount+=1;
            }
        })
        return completedCount;
    }
    render() {
        let allTasks = this.state.tasks;
        let nowShown = this.state.nowShowing;
        const shownTasks = allTasks.filter(function (task) {
                switch (nowShown) {
                    case "Active":
                        return !task.isCompleted;
                    case "Completed":
                        return task.isCompleted;
                    default:
                        return true;
                }
            }
        );
        let todoList = shownTasks.map(task =>
            <ToDoItem
                key={task.id}
                task={task}
                handleToggle={this.handleToggle}
            />
        );
        return (
            <div>
                <Header/>
                <InputTaker
                    addTask={this.addTask}
                />
                {todoList}
                <Footer activeTasksCount={this.activeTasksCount()} handleShown={this.handleShown}/>
            </div>
        );
    }
}

export default App;