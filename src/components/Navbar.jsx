function Navbar({ taskCount, doneCount, onClearDone }) {
    return (
        <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-white tracking-tight">
                    Kan<span className="text-blue-400">bi</span>
                </span>
                <span className="text-xs bg-blue-400/10 text-blue-400 border border-blue-400/20 rounded-full px-2 py-0.5 font-semibold">
                    beta
                </span>
            </div>

            <div className="flex items-center gap-3">
                {doneCount > 0 && (
                    <button
                        onClick={onClearDone}
                        className="text-xs text-gray-400 hover:text-red-400 border border-gray-700 hover:border-red-400/30 rounded-full px-3 py-1.5 transition-all"
                    >
                        Limpiar completadas ({doneCount})
                    </button>
                )}
                <div className="flex items-center gap-2 bg-gray-800 rounded-full px-3 py-1.5 border border-gray-700">
                    <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_#38bdf8]"></span>
                    <span className="text-sm text-gray-300 font-medium">
                        {taskCount} {taskCount === 1 ? 'tarea' : 'tareas'}
                    </span>
                </div>
                <span className="text-sm text-gray-400">Tu tablero personal</span>
            </div>
        </nav>
    )
}

export default Navbar