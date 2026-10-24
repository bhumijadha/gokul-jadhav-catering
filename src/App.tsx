import { useEffect, useState } from 'react'
import { loadAppData, saveAppData } from './lib/storage'
import type { AppData } from './types'
import AdminLayout from './components/AdminLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

type Screen = 'home' | 'login' | 'admin'

export default function App() {
  const [data, setData] = useState<AppData>(loadAppData)
  const [screen, setScreen] = useState<Screen>(() => sessionStorage.getItem('gjc-admin') ? 'admin' : 'home')

  useEffect(() => saveAppData(data), [data])

  function openAdmin() {
    setScreen(sessionStorage.getItem('gjc-admin') ? 'admin' : 'login')
  }

  function signIn() {
    sessionStorage.setItem('gjc-admin', '1')
    setScreen('admin')
  }

  function signOut() {
    sessionStorage.removeItem('gjc-admin')
    setScreen('home')
  }

  if (screen === 'login') return <LoginPage onSignIn={signIn} onHome={() => setScreen('home')} />
  if (screen === 'admin') {
    return <AdminLayout data={data} onDataChange={setData} onLogout={signOut} onHome={() => setScreen('home')} />
  }
  return <HomePage settings={data.settings} onAdmin={openAdmin} />
}