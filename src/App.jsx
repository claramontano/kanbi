import { useState } from 'react'
import Navbar from './components/Navbar'
import Board from './components/Board'

function App() {
  const [taskCount, setTaskCount] = useState(0)
  const [doneCount, setDoneCount] = useState(0)
  const [clearDone, setClearDone] = useState(false)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar
        taskCount={taskCount}
        doneCount={doneCount}
        onClearDone={() => setClearDone(true)}
      />
      <Board
        onTaskCountChange={setTaskCount}
        onDoneCountChange={setDoneCount}
        clearDone={clearDone}
        onClearDoneDone={() => setClearDone(false)}
      />
    </div>
  )
}

export default App