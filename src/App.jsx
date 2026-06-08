import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import FilterTabs from './components/FilterTabs'
import TaskList from './components/TaskList'
import './App.css'

const STORAGE_KEY = 'taskManager.tasks'

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

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

      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  )
}

export default App