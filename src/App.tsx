import './App.css'
import LampContainer from './components/LampContainer'

function App() {
  return (
    <div className="app">
      <div className="lamps-grid">
        <LampContainer label="Red" />
        <LampContainer label="Green" />
        <LampContainer label="Blue" />
      </div>
    </div>
  )
}

export default App
