import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:8000/api/todos/');
        setTasks(response.data);
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            // Create a new task by making a POST request to the API
            const response = await axios.post('http://localhost:8000/api/todos/', {
                text: newTask,
                completed: false,
                date: '2024-11-03'
            });

            // Update the tasks list with the newly added task
            setTasks([...tasks, response.data]);

            // Clear the input field
            setNewTask('');
        }
    };


    const handleCompleteTask = async (taskId,isCompleted) => {
        try{
            const response = await axios.patch(`http://localhost:8000/api/todos/${taskId}/`, {
                completed: true,
            });

        }
        catch (error) {
            console.error(error);
        }
        setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
        const status = document.getElementById(`complete-button-${taskId}`);
        if(isCompleted){
            status.innerText = "Complete";
        }else{
            status.innerText = "Completed";
        }

        // Update the task's completed status by making a PATCH request to the API
      }

    return (
        <div className='parent'>
            <h1 style={{ color: 'white',margin:'40px'}}>Todo App</h1>

            <div className='container'>
                
                <div className="add-task">
                    
                    <form onSubmit={handleAddTask}>
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Add a new task"
                            id='task-input'
                            // style={{width:'100%', height :'4em', margin:'1em', fontSize:'1em'}}
                        />
                        <button type="submit" id='add-task-button'>Add Task</button>
                        <button type="button" id='flush-button'>Flush</button>
                    </form>
                    <p><b>Examples</b></p>
                    <ul>
                        <li><b>meeting at 5pm</b></li>
                        <li><b>call mom</b></li>  
                        <li><b>read book</b></li>
                        <li><b>go to gym</b></li>
                        
                    </ul>

                </div>
            
                <div className='task-list'>
                    <ul>
                        {tasks.slice().reverse().map(task => (
                            <li key={task.id} >
                                <h4 style={{width:'50%'}}>{task.text}{task.completed ? '(Completed)' : '' }</h4>
                                <p>{task.date}</p>
                                <button id={`complete-button-${task.id}`} onClick={() => {handleCompleteTask(task.id,task.completed)}}>Complete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            
            </div>

        </div>
        
    );
}


export default App;
