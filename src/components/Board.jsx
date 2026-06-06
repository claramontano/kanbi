import { useState } from 'react'
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
    const [tasks, setTasks] = useState(initialTasks)

    return (
        <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
                {columns.map(column => (
                    <Column
                        key={column.id}
                        column={column}
                        tasks={tasks.filter(t => t.column === column.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Board