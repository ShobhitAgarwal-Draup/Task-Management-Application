import { useState } from 'react'

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (trimmedTitle === '') return

    onAdd(trimmedTitle, priority)

    setTitle('')
    setPriority('medium')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-form__input"
        type="text"
        value={title}
        placeholder="What needs to be done?"
        onChange={(event) => setTitle(event.target.value)}
        aria-label="Task title"
      />

      <select
        className="task-form__select"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
        aria-label="Priority"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button className="task-form__button" type="submit">
        Add
      </button>
    </form>
  )
}

export default TaskForm
