import { useState } from 'react'
import TaskForm from './components/TaskForm'
import FilterTabs from './components/FilterTabs'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  function addTask(title, priority) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      priority,
      completed: false,
    }
    setTasks((prev) => [...prev, newTask])
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const remainingCount = tasks.filter((task) => !task.completed).length

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <TaskForm onAdd={addTask} />

      <FilterTabs
        filter={filter}
        onChange={setFilter}
        remainingCount={remainingCount}
      />

      {/* Temporary inline list - replaced by TaskList/TaskItem in next todo */}
      <ul>
        {visibleTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {task.title} ({task.priority})
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
