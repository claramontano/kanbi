function TaskCard({ task, onDeleteTask, onMoveTask }) {
    const priorityMap = {
        alta: { label: 'Alta', classes: 'bg-red-400/10 text-red-400 border-red-400/20' },
        media: { label: 'Media', classes: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
        baja: { label: 'Baja', classes: 'bg-gray-400/10 text-gray-400 border-gray-400/20' },
    }

    const columnOrder = ['todo', 'inprogress', 'done']
    const currentIndex = columnOrder.indexOf(task.column)
    const canMoveLeft = currentIndex > 0
    const canMoveRight = currentIndex < columnOrder.length - 1

    const priority = priorityMap[task.priority]

    return (
        <div className="group bg-gray-800 rounded-lg p-3 flex flex-col gap-2 hover:ring-1 hover:ring-blue-400/30 transition-all relative">

            {/* Botón eliminar */}
            <button
                onClick={() => onDeleteTask(task.id)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all text-lg leading-none"
            >
                ×
            </button>

            <p className="text-sm text-gray-100 font-medium leading-snug pr-4">
                {task.title}
            </p>

            <div className="flex items-center justify-between">
                <span className={`text-xs border rounded-full px-2 py-0.5 font-semibold ${priority.classes}`}>
                    {priority.label}
                </span>

                {/* Flechas para mover */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                        onClick={() => canMoveLeft && onMoveTask(task.id, columnOrder[currentIndex - 1])}
                        disabled={!canMoveLeft}
                        className="text-gray-400 hover:text-blue-400 disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-base px-1"
                        title="Mover atrás"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => canMoveRight && onMoveTask(task.id, columnOrder[currentIndex + 1])}
                        disabled={!canMoveRight}
                        className="text-gray-400 hover:text-blue-400 disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-base px-1"
                        title="Mover adelante"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskCard