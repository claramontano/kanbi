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

    useEffect(() => { onTaskCountChange(tasks.length) }, [tasks])
    useEffect(() => { onDoneCountChange(tasks.filter(t => t.column === 'done').length) }, [tasks])

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

        if (COLUMN_IDS.includes(overId)) {
            setTasks(prev => prev.map(t =>
                t.id === activeId ? { ...t, column: overId } : t
            ))
            return
        }

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
            {/* Móvil: columnas apiladas | Desktop: 3 columnas en fila */}
            <div style={{ padding: '16px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
                    gap: '12px',
                }}>
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
                    <div style={{
                        background: '#1f2937',
                        borderRadius: '8px',
                        padding: '12px',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                        outline: '1px solid rgba(96,165,250,0.4)',
                        transform: 'rotate(1deg)',
                    }}>
                        <p style={{ fontSize: '14px', color: '#f3f4f6', fontWeight: 500 }}>
                            {activeTask.title}
                        </p>
                    </div>
                )}
            </DragOverlay>
        </DndContext>
    )
}

export default Board