import { useRef, useState } from 'react'
import { API } from '../config/api';
import type { LampContainerPropsTest } from '../models/LampContainerPropsTest';

const listLamps: LampContainerPropsTest[] = [{
  id: 1,
  label: 'Red wine',
  status: false,
  description: 'A simple lamp',
  brightness: 100
},
{
  id: 2,
  label: 'Blue sky',
  status: false,
  description: 'Another simple lamp',
  brightness: 128
},
{
  id: 3,
  label: 'Green field',
  status: false,
  description: 'Yet another simple lamp',
  brightness: 200
}]

const saveRequest = async (path: string, item: LampContainerPropsTest) => {
  try {
    await fetch(`${API.BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
  } catch (e) {
    console.error('Request failed:', e)
  }
}
const updateRequest = async (item: LampContainerPropsTest) => {
  console.log('Updating item:', item)
  console.log('API URL:', `${API.BASE_URL}${API.LAMPS}`)
  try {
    await fetch(`${API.BASE_URL}${API.LAMPS}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
  } catch (e) {
    console.error('Request failed:', e)
  }
}

const PowerIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="34" height="34">
      <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
    </svg>
  )
}

const LampCard = ({lamp}: {lamp: LampContainerPropsTest}) => {
  const [isOn, setIsOn] = useState(lamp.status)
  const [brightness, setBrightness] = useState(lamp.brightness)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const togglePower = (item: LampContainerPropsTest) => {
  console.log('togglePower Updating item:', item)
  console.log('togglePower API URL:', `${API.BASE_URL}${API.LAMPS}`)
    const next = !isOn
    setIsOn(next)
    //item.status = next
    updateRequest(item)
  }

  const handleBrightness = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setBrightness(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      //updateRequest(`/light/intensity/value/${value}`, { ...props, brightness: value })
    }, 150)
  }

  const pct = Math.round((brightness / 255) * 100)
  const sliderBg = `linear-gradient(to right, #a02800 0%, #ff4400 ${pct}%, #3a3a3a ${pct}%, #2a2a2a 100%)`

  return (
      <div className="lamp-card" key={lamp.id}>
        <header className="hdr">
          <div aria-label="Back"></div>
          <span className="title">{lamp.label}</span>
          <button className="icon-btn" aria-label="Settings">⚙</button>
        </header>

        <main className="main">
          <button
            className={`power-btn${isOn ? ' on' : ''}`}
            onClick={() => togglePower(lamp)}
            aria-label={isOn ? 'Turn off' : 'Turn on'}
          >
            <div className="tick-ring" />
            <div className="glow-ring g1" />
            <div className="glow-ring g2" />
            <div className="power-icon">
              <PowerIcon />
            </div>
          </button>
          <p className="status">{isOn ? 'Power is On' : 'Power is Off'}</p>
        </main>

        <footer className="footer">
          <div className="brightness-row">
            <span>Brightness</span>
            <span>{pct}%</span>
          </div>
          <input
            key={lamp.id}
            type="range"
            min="1"
            max="255"
            value={brightness}
            onChange={handleBrightness}
            className="slider"
            style={{ background: sliderBg }}
          />
        </footer>
      </div>
  );
}

const LampContainer = ({ }: LampContainerPropsTest) => {
  return (
    <>
      {listLamps.map((lamp) => (
        <LampCard key={lamp.id} lamp={lamp} />
      ))}
    </>
  )
}

export default LampContainer