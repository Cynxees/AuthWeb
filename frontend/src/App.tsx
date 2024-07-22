import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import UserContext from './contexts/UserContext'
import { User } from 'realm'
import HomePage from './pages/HomePage'


function App() {

  const [user, setUser] = useState<User | null>(null);
  const value = {user, setUser}

  return (
    <BrowserRouter>

      <UserContext.Provider value={value}>

      <Routes>
        

        <Route path="" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />

      </Routes>
      </UserContext.Provider>

    </BrowserRouter>
  )
}

export default App
