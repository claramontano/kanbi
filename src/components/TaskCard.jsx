import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function TaskCard({ task, onDeleteTask }) {
    const {
        attributes, listeners, setNodeRef,
        transform, transition, isDragging
    } = useSortable({ id: task.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    }

    const priorityMap = {
        alta: { label: 'Alta', classes: 'bg-red-400/10 text-red-400 border-red-400/20' },
        media: { label: 'Media', classes: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
        baja: { label: 'Baja', classes: 'bg-gray-400/10 text-gray-400 border-gray-400/20' },
    }

    const priority = priorityMap[task.priority]

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="group bg-gray-800 rounded-lg p-3 flex flex-col gap-2 cursor-grab active:cursor-grabbing hover:ring-1 hover:ring-blue-400/30 transition-all relative select-none"
        >
            <button
                onPointerDown={e => e.stopPropagation()}
                onClick={() => onDeleteTask(task.id)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all text-lg leading-none"
            >
                ×
            </button>
            <p className="text-sm text-gray-100 font-medium leading-snug pr-4">
                {task.title}
            </p>
            <span className={`text-xs border rounded-full px-2 py-0.5 font-semibold w-fit ${priority.classes}`}>
                {priority.label}
            </span>
        </div>
    )
}

export default TaskCard