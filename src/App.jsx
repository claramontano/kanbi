import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Board from './components/Board'

function App() {
  const [taskCount, setTaskCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar taskCount={taskCount} />
      <Board onTaskCountChange={setTaskCount} />
    </div>
  )
}

export default App