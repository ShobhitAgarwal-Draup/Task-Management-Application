import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  function startEditing() {
    setDraft(task.title)
    setIsEditing(true)
  }

  function cancelEditing() {
    setDraft(task.title)
    setIsEditing(false)
  }

  function saveEditing() {
    const trimmed = draft.trim()
    if (trimmed !== '' && trimmed !== task.title) {
      onEdit(task.id, trimmed)
    }
    setIsEditing(false)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      saveEditing()
    } else if (event.key === 'Escape') {
      cancelEditing()
    }
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={task.completed ? 'task-item task-item--completed' : 'task-item'}
    >
      <button
        className="task-item__drag"
        type="button"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>

      {isEditing ? (
        <input
          className="task-item__edit-input"
          type="text"
          value={draft}
          autoFocus
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveEditing}
          aria-label="Edit task title"
        />
      ) : (
        <label className="task-item__label">
          <input
            className="task-item__checkbox"
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span className="task-item__title">{task.title}</span>
        </label>
      )}

      {task.completed ? (
        <span className="task-item__badge task-item__badge--done">Done</span>
      ) : (
        <span className={`task-item__badge task-item__badge--${task.priority}`}>
          {task.priority}
        </span>
      )}

      {isEditing ? (
        <>
          <button
            className="task-item__action task-item__save"
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={saveEditing}
          >
            Save
          </button>
          <button
            className="task-item__action task-item__cancel"
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={cancelEditing}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            className="task-item__action task-item__edit"
            type="button"
            onClick={startEditing}
            aria-label={`Edit task: ${task.title}`}
          >
            Edit
          </button>
          <button
            className="task-item__action task-item__delete"
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete task: ${task.title}`}
          >
            Delete
          </button>
        </>
      )}
    </li>
  )
}

export default TaskItem
