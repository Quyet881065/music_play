import { useState } from 'react'
import './App.css'
import { MusicPlayer } from './lib/components/MusicPlayer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex justify-center bg-gray-200 h-screen items-center'>
     <MusicPlayer/>
    </div>
  )
}

export default App
