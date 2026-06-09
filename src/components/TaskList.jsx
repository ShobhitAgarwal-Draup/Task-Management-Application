import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import TaskItem from './TaskItem'

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <p className="task-list__empty">No tasks here yet.</p>
  }

  return (
    <SortableContext
      items={tasks.map((task) => task.id)}
      strategy={verticalListSortingStrategy}
    >
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </SortableContext>
  )
}

export default TaskList
