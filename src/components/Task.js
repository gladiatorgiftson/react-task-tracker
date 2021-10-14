import { FaTimes } from "react-icons/fa";

const faTimesStyle = {
  color: "red",
  cursor: "pointer",
};

const Task = ({ task, onDelete, onToogle }) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={()=> onToogle(task.id)}>
      <h3>
        {task.text}
        <FaTimes onClick={() => onDelete(task.id)} style={faTimesStyle} />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
