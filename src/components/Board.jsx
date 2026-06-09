import { useState, useEffect } from 'react'
import Column from './Column'

const initialTasks = [
    { id: 1, title: 'Diseñar el logo', priority: 'alta', column: 'todo' },
    { id: 2, title: 'Configurar base de datos', priority: 'alta', column: 'todo' },
    { id: 3, title: 'Crear componente Navbar', priority: 'media', column: 'inprogress' },
    { id: 4, title: 'Escribir tests', priority: 'baja', column: 'inprogress' },
    { id: 5, title: 'Setup del proyecto', priority: 'media', column: 'done' },
]

const columns = [
    { id: 'todo', title: 'Por hacer', color: 'blue' },
    { id: 'inprogress', title: 'En progreso', color: 'yellow' },
    { id: 'done', title: 'Hecho', color: 'green' },
]

function Board() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('kanbi-tasks')
        return saved ? JSON.parse(saved) : initialTasks
    })

    useEffect(() => {
        localStorage.setItem('kanbi-tasks', JSON.stringify(tasks))
    }, [tasks])

    function handleAddTask(columnId, title, priority) {
        const newTask = {
            id: Date.now(),
            title,
            priority,
            column: columnId,
        }
        setTasks([...tasks, newTask])
    }

    function handleDeleteTask(taskId) {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    function handleMoveTask(taskId, newColumn) {
        setTasks(tasks.map(t =>
            t.id === taskId ? { ...t, column: newColumn } : t
        ))
    }

    return (
        <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
                {columns.map(column => (
                    <Column
                        key={column.id}
                        column={column}
                        tasks={tasks.filter(t => t.column === column.id)}
                        onAddTask={handleAddTask}
                        onDeleteTask={handleDeleteTask}
                        onMoveTask={handleMoveTask}
                    />
                ))}
            </div>
        </div>
    )
}

export default Board