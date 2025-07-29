import { useState } from 'react'
import './App.css'
import PasswordGenerator from './components/PasswordGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="fullscreen-center">
        <PasswordGenerator />
      </div>
    </>
  )
}

export default App
