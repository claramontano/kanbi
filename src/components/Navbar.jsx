function Navbar() {
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
            <span className="text-sm text-gray-400">
                Tu tablero personal
            </span>
        </nav>
    )
}

export default Navbar