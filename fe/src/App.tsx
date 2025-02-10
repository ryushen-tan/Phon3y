import { useState } from 'react'
import Transcribe from './components/Transcribe'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Transcribe></Transcribe>
    </>
  )
}

export default App
