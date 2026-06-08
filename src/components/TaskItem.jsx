function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? 'task-item task-item--completed' : 'task-item'}>
      <label className="task-item__label">
        <input
          className="task-item__checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        /> 
        <span className="task-item__title">{task.title}</span>
      </label>

      {task.completed ? (
        <span className="task-item__badge task-item__badge--done">Done</span>
      ) : (
        <span className={`task-item__badge task-item__badge--${task.priority}`}>
          {task.priority}
        </span>
      )}

      <button
        className="task-item__delete"
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task: ${task.title}`}
      >
        Delete
      </button>
    </li>
  )
}

export default TaskItem
