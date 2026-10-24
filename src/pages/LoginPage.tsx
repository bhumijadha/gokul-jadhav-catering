import { ArrowLeft, KeyRound, LockKeyhole } from 'lucide-react'
import { useState, type FormEvent } from 'react'

type Props = { onSignIn: () => void; onHome: () => void }

export default function LoginPage({ onSignIn, onHome }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (username.trim() === 'admin' && password === 'gokul2026') onSignIn()
    else setError('Those demo credentials did not match. Please try again.')
  }

  return <main className="login-page"><div className="login-image"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1300&q=85" alt="A colourful meal prepared for sharing" /><button className="login-back" onClick={onHome}><ArrowLeft size={16} /> Back to website</button><div className="login-image-caption"><span>GOKUL JADHAV CATERING</span><h2>Good food brings<br />us closer.</h2></div></div><section className="login-panel"><a className="public-brand login-brand" href="#home" aria-label="Back to Gokul Jadhav Catering home" onClick={(event) => { event.preventDefault(); onHome() }}><img className="brand-logo" src="/gokul-jadhav-logo.svg" alt="Gokul Jadhav Catering" /></a><div className="login-form-wrap"><span className="login-icon"><LockKeyhole size={20} /></span><div className="eyebrow"><span className="eyebrow-line" /> PRIVATE WORKSPACE</div><h1>Welcome<br /><em>back.</em></h1><p className="login-intro">Sign in to manage recipes, events and your kitchen settings.</p><form onSubmit={submit} className="login-form"><label>Username<input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter your username" required /></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button-primary login-submit" type="submit">Sign in <KeyRound size={16} /></button></form><div className="demo-notice"><strong>Prototype sign-in</strong><span>Username: admin &nbsp;·&nbsp; Password: gokul2026</span><small>For live use, connect this screen to secure server-side authentication.</small></div></div><span className="login-footnote">GOKUL JADHAV CATERING · ADMIN</span></section></main>
}