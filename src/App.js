import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTasks from './components/AddTask';
import { useState, useEffect } from "react";

const App = ()=> {

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    const getTasks= async () => {
      const tasksFromServer = await fetchTask();
      setTasks(tasksFromServer)
    }
    getTasks()
  },[]);


  //Fetch task
  const fetchTask = async ()=>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //Add task

  const addTask  = (task)=>{
    const id = Math.floor(Math.random() * 10000 + 1)
    const newTask = {id, ...task}
    setTasks([...tasks, newTask]);
  }

  //Delete Task
  const deleteTask = async (id)=>{

    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {method :'DELETE'})
    } catch (error) {
      console.log(error)
    }
    
    setTasks(tasks.filter((task)=> task.id !== id))
  }


  // Toogle Reminder
  const toogleReminder = (id)=>{
    setTasks(tasks.map((task)=> task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  
  return (
    <div className="container">
      <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && < AddTasks onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToogle={toogleReminder} / > : "No Tasks to show"} 
    </div>
  );
}

export default App;
