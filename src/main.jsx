import React from 'react'
// import ReactDOM from 'react-dom/client'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { AliveScope } from 'react-activation'


ReactDOM.render(
  <AliveScope>
    <App />
  </AliveScope>,
  document.getElementById('root')
)
