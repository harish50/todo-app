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
            nowShowing: 'All',
            completedTasksCount: 0,
            activeTasksCount: 0
        };
        this.addTask = this.addTask.bind(this);
        this.handleShown = this.handleShown.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    componentDidMount() {
        const tasksRef = database.ref('tasks');
        tasksRef.on('value', snapshot => {
            let newTasks = [];
            let completedTaskCount = 0;
            let activeTaskCount = 0;
            snapshot.forEach(task => {
                let newTask = task.val();
                newTask.key = task.key;
                newTasks.push(newTask);
                if (newTask.isCompleted) {
                    completedTaskCount += 1;
                }
                else {
                    activeTaskCount += 1;
                }
            });
            this.setState({
                tasks: newTasks,
                activeTasksCount: activeTaskCount,
                completedTasksCount: completedTaskCount
            });
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

    deleteTask(taskKey) {
        const tasksRef = database.ref('tasks');
        tasksRef.update({[taskKey]: null});
    }

    clearCompleted() {
        let deleteTask = this.deleteTask;
        this.state.tasks.map(task => {
            if (task.isCompleted) {
                deleteTask(task.key);
            }
        });
    }

    toggleAll() {
        const tasksRef = database.ref('tasks');
        if (this.state.activeTasksCount) {
            this.state.tasks.map(task => {
                if (!task.isCompleted) {
                    tasksRef.child(task.key).child('isCompleted').set(true);
                }
            });
        }
        else {
            this.state.tasks.map(task => {
                tasksRef.child(task.key).child('isCompleted').set(!task.isCompleted);
            });
        }
    }

    getTodoList() {
        let allTasks = this.state.tasks;
        let nowShown = this.state.nowShowing;
        const shownTasks = allTasks.filter(task => {
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
        return todoList;
    }

    render() {
        let toggleall = this.state.tasks.length > 0 ? <input
            id={"toggle-all"}
            className={"toggle-all"}
            type={"checkbox"}
            checked={this.state.activeTasksCount > 0 ? false : true}
            onChange={this.toggleAll}
        /> : "";
        return (
            <div className={"todoapp"}>
                <header className={"header"}>
                    <Header/>
                    <InputTaker
                        addTask={this.addTask}
                    />
                </header>
                <section className={"main"}>
                    {toggleall}
                    <label htmlFor={"toggle-all"}></label>
                    <ul className={"todo-list"}>
                        {this.getTodoList()}
                    </ul>
                </section>
                <Footer
                    completedTasksCount={this.state.completedTasksCount}
                    activeTasksCount={this.state.activeTasksCount}
                    handleShown={this.handleShown}
                    clearCompleted={this.clearCompleted}
                />
            </div>
        );
    }
}

export default App;