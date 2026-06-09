import { useState } from 'react'
import TaskCard from './TaskCard'

function Column({ column, tasks, onAddTask, onDeleteTask, onMoveTask }) {

    const [adding, setAdding] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newPriority, setNewPriority] = useState('media')

    const colorMap = {
        blue: 'bg-blue-400',
        yellow: 'bg-yellow-400',
        green: 'bg-green-400',
    }

    function handleAdd() {
        if (newTitle.trim() === '') return
        onAddTask(column.id, newTitle.trim(), newPriority)
        setNewTitle('')
        setNewPriority('media')
        setAdding(false)
    }

    return (
        <div className="bg-gray-900 rounded-xl p-4 flex flex-col gap-3">

            {/* Cabecera */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${colorMap[column.color]}`}></span>
                    <h2 className="font-semibold text-gray-100 text-sm uppercase tracking-wider">
                        {column.title}
                    </h2>
                </div>
                <span className="text-xs bg-gray-800 text-gray-400 rounded-full px-2 py-0.5">
                    {tasks.length}
                </span>
            </div>

            {/* Tarjetas */}
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onDeleteTask={onDeleteTask}
                    onMoveTask={onMoveTask}
                />
            ))}

            {/* Añadir tarea */}
            {adding ? (
                <div className="flex flex-col gap-2 mt-1">
                    <input
                        autoFocus
                        type="text"
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAdd()}
                        placeholder="Título de la tarea..."
                        className="bg-gray-800 text-sm text-white rounded-lg px-3 py-2 outline-none ring-1 ring-blue-400/50 placeholder-gray-500"
                    />
                    <select
                        value={newPriority}
                        onChange={e => setNewPriority(e.target.value)}
                        className="bg-gray-800 text-sm text-gray-300 rounded-lg px-3 py-2 outline-none ring-1 ring-gray-600"
                    >
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                    </select>
                    <div className="flex gap-2">
                        <button
                            onClick={handleAdd}
                            className="text-xs bg-blue-500 hover:bg-blue-400 text-white rounded-lg px-3 py-1.5 font-semibold transition-colors"
                        >
                            Añadir
                        </button>
                        <button
                            onClick={() => { setAdding(false); setNewTitle(''); setNewPriority('media') }}
                            className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setAdding(true)}
                    className="text-sm text-gray-500 hover:text-gray-300 flex items-center gap-1 mt-1 transition-colors"
                >
                    <span className="text-lg leading-none">+</span> Añadir tarea
                </button>
            )}

        </div>
    )
}

export default Column