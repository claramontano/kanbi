import TaskCard from './TaskCard'

function Column({ column, tasks }) {
    const colorMap = {
        blue: 'bg-blue-400',
        yellow: 'bg-yellow-400',
        green: 'bg-green-400',
    }

    return (
        <div className="bg-gray-900 rounded-xl p-4 flex flex-col gap-3">

            {/* Cabecera de la columna */}
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
                <TaskCard key={task.id} task={task} />
            ))}

        </div>
    )
}

export default Column