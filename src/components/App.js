import React, {Component} from "react";
import Header from './Header';
import InputTaker from './InputTaker';
import ToDoItem from './ToDoItem';
import Footer from './Footer';
import database from './Firebase';
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
        this.completedTasksCount = this.completedTasksCount.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    componentDidMount() {
        const tasksRef = database.ref('tasks');
        tasksRef.on('value', snapshot => {
            let tasks = [];
            snapshot.forEach(task => {
                let newTask = task.val();
                newTask.key = task.key;
                tasks.push(newTask);
            });
            this.setState({tasks: tasks});
        }).bind(this);
    }

    addTask(newTask) {
        const tasksRef = database.ref('tasks');
        tasksRef.push(newTask);
    }

    handleShown(action) {
        this.setState({nowShowing: action.target.textContent});
    }

    handleToggle(task) {
        const tasksRef = database.ref('tasks');
        tasksRef.child(task.key).child('isCompleted').set(!task.isCompleted);
    }

    completedTasksCount() {
        let completedCount = 0;
        this.state.tasks.map(task => {
            if (task.isCompleted) {
                completedCount += 1;
            }
        })
        return completedCount;
    }

    deleteTask(taskKey) {
        const tasksRef = database.ref('tasks');
        tasksRef.update({[taskKey]: null});
    }

    clearCompleted() {
        let deleteTask = this.deleteTask;
        this.state.tasks.map(function (task) {
            if (task.isCompleted) {
                deleteTask(task.key);
            }
            ;
        });
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
                key={task.key}
                task={task}
                handleToggle={this.handleToggle}
                deleteTask={this.deleteTask}
            />
        );
        let completedTasksCount = this.completedTasksCount();
        let activeTasksCount = this.state.tasks.length - completedTasksCount;
        return (
            <div className={"todoapp"}>
                <header className={"header"}>
                    <Header/>
                    <InputTaker
                        addTask={this.addTask}
                    />
                </header>
                <section className={"main"}>
                    <ul className={"todo-list"}>
                        {todoList}
                    </ul>
                </section>
                <Footer
                    completedTasksCount={completedTasksCount}
                    activeTasksCount={activeTasksCount}
                    handleShown={this.handleShown}
                    clearCompleted={this.clearCompleted}
                />
            </div>
        );
    }
}

export default App;