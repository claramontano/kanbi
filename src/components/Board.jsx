import { useState, useEffect } from 'react'
import {
    DndContext, DragOverlay,
    PointerSensor, useSensor, useSensors,
    closestCenter
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './Column'
import TaskCard from './TaskCard'

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

const COLUMN_IDS = ['todo', 'inprogress', 'done']

function Board({ onTaskCountChange, onDoneCountChange, clearDone, onClearDoneDone }) {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('kanbi-tasks')
        return saved ? JSON.parse(saved) : initialTasks
    })
    const [activeTask, setActiveTask] = useState(null)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
    )

    useEffect(() => {
        localStorage.setItem('kanbi-tasks', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        onTaskCountChange(tasks.length)
    }, [tasks])

    useEffect(() => {
        onDoneCountChange(tasks.filter(t => t.column === 'done').length)
    }, [tasks])

    useEffect(() => {
        if (clearDone) {
            setTasks(prev => prev.filter(t => t.column !== 'done'))
            onClearDoneDone()
        }
    }, [clearDone])
    function handleDragStart({ active }) {
        setActiveTask(tasks.find(t => t.id === active.id) || null)
    }

    function handleDragEnd({ active, over }) {
        setActiveTask(null)
        if (!over) return

        const activeId = active.id
        const overId = over.id
        if (activeId === overId) return

        // Soltado sobre una columna
        if (COLUMN_IDS.includes(overId)) {
            setTasks(prev => prev.map(t =>
                t.id === activeId ? { ...t, column: overId } : t
            ))
            return
        }

        // Soltado sobre una tarjeta
        setTasks(prev => {
            const activeTask = prev.find(t => t.id === activeId)
            const overTask = prev.find(t => t.id === overId)
            if (!activeTask || !overTask) return prev

            const targetColumn = overTask.column

            const updated = prev.map(t =>
                t.id === activeId ? { ...t, column: targetColumn } : t
            )

            const columnTasks = updated.filter(t => t.column === targetColumn)
            const oldIndex = columnTasks.findIndex(t => t.id === activeId)
            const newIndex = columnTasks.findIndex(t => t.id === overId)
            const reordered = arrayMove(columnTasks, oldIndex, newIndex)

            return [
                ...updated.filter(t => t.column !== targetColumn),
                ...reordered
            ]
        })
    }

    function handleAddTask(columnId, title, priority) {
        setTasks(prev => [...prev, { id: Date.now(), title, priority, column: columnId }])
    }

    function handleDeleteTask(taskId) {
        setTasks(prev => prev.filter(t => t.id !== taskId))
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                    {columns.map(column => (
                        <Column
                            key={column.id}
                            column={column}
                            tasks={tasks.filter(t => t.column === column.id)}
                            onAddTask={handleAddTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    ))}
                </div>
            </div>

            <DragOverlay>
                {activeTask && (
                    <div className="bg-gray-800 rounded-lg p-3 shadow-2xl ring-1 ring-blue-400/50 rotate-1">
                        <p className="text-sm text-gray-100 font-medium">{activeTask.title}</p>
                    </div>
                )}
            </DragOverlay>
        </DndContext>
    )
}

export default Board