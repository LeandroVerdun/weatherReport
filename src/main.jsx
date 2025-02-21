import React from 'react'
import ReactDOM from 'react-dom/client'
import { WeatherReport } from './WeatherReport'
import './styles/weatherStyles.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WeatherReport></WeatherReport>
  </React.StrictMode>,
)
