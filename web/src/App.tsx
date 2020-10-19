import React, { useState } from 'react'
import Routes from './routes'
import '../src/styles/global.css'
import 'leaflet/dist/leaflet.css'
import UserContext from './contexts/UserContext'

function App() {

  const [isAuth, setIsAuth] = useState(false)
  const [token, setToken] = useState('')

  return (
    <UserContext.Provider value={{ isAuth, setIsAuth, setToken, token }} >
      <Routes />
    </UserContext.Provider>
  )
}

export default App