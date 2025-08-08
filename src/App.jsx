import { useState } from 'react'
import './App.css'
import { MusicPlayer } from './lib/components/MusicPlayer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <MusicPlayer/>
    </>
  )
}

export default App
