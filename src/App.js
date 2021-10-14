import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTasks from './components/AddTask';
import { useState } from "react";

const App = ()=> {
  const data = [
    {
      id: 1,
      text: "ABcd fgh",
      day: "October 16th at 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "ABcd fgh",
      day: "October 23rd at 16:00pm",
      reminder: true,
    },
    {
      id: 3,
      text: "ABcd fgh",
      day: "October 30th at 16:23pm",
      reminder: true,
    },
  ];
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState(data);

  //Add task

  const addTask  = (task)=>{
    const id = Math.floor(Math.random() * 10000 + 1)
    const newTask = {id, ...task}
    setTasks([...tasks, newTask]);
  }

  //Delete Task
  const deleteTask = (id)=>{
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
