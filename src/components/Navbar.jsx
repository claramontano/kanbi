function Navbar({ taskCount, doneCount, onClearDone }) {
    return (
        <nav style={{
            background: '#111827',
            borderBottom: '1px solid #374151',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
        }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', letterSpacing: '-0.5px' }}>
                    Kan<span style={{ color: '#60a5fa' }}>bi</span>
                </span>
                <span style={{
                    fontSize: '0.65rem', background: 'rgba(96,165,250,0.1)',
                    color: '#60a5fa', border: '1px solid rgba(96,165,250,0.2)',
                    borderRadius: '999px', padding: '2px 8px', fontWeight: 600
                }}>beta</span>
            </div>

            {/* Controles */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {doneCount > 0 && (
                    <button
                        onClick={onClearDone}
                        style={{
                            fontSize: '0.75rem', color: '#9ca3af',
                            border: '1px solid #374151', borderRadius: '999px',
                            padding: '6px 12px', background: 'transparent',
                            cursor: 'pointer', whiteSpace: 'nowrap',
                            transition: 'color 0.2s, border-color 0.2s',
                        }}
                        onMouseEnter={e => { e.target.style.color = '#f87171'; e.target.style.borderColor = 'rgba(248,113,113,0.3)' }}
                        onMouseLeave={e => { e.target.style.color = '#9ca3af'; e.target.style.borderColor = '#374151' }}
                    >
                        Limpiar completadas ({doneCount})
                    </button>
                )}

                <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: '#1f2937', borderRadius: '999px',
                    padding: '6px 12px', border: '1px solid #374151',
                }}>
                    <span style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: '#60a5fa', boxShadow: '0 0 6px #38bdf8', flexShrink: 0,
                    }}></span>
                    <span style={{ fontSize: '0.85rem', color: '#d1d5db', fontWeight: 500, whiteSpace: 'nowrap' }}>
                        {taskCount} {taskCount === 1 ? 'tarea' : 'tareas'}
                    </span>
                </div>

                <span style={{ fontSize: '0.8rem', color: '#6b7280', display: 'none' }} className="navbar-subtitle">
                    Tu tablero personal
                </span>
            </div>
        </nav>
    )
}

export default Navbar