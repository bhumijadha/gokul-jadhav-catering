import { CircleDollarSign, Info, Save } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import type { BusinessSettings } from '../types'

type Props = { settings: BusinessSettings; onChange: (settings: BusinessSettings) => void }

export default function CostSettingsPage({ settings, onChange }: Props) {
  const [value, setValue] = useState(settings.costPerGuest)
  const [saved, setSaved] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onChange({ ...settings, costPerGuest: value })
    setSaved(true)
  }

  return <div className="page-wrap">
    <div className="page-title-row"><div><div className="eyebrow"><span className="eyebrow-line" /> PRICING & ESTIMATES</div><h1>Cost settings</h1><p>Keep a planning estimate for your event conversations.</p></div></div>
    <div className="settings-layout"><section className="panel settings-panel"><div className="form-section-head"><div className="quick-link-icon"><CircleDollarSign size={19} /></div><div><h2>Guest estimate</h2><p>A simple starting point for your own event estimates.</p></div></div><form onSubmit={submit}><label className="cost-field">Estimated cost per guest<div className="currency-input"><span>Rs.</span><input type="number" min="0" step="0.01" value={value} onChange={(event) => { setValue(event.target.value); setSaved(false) }} placeholder="Leave blank until set" /></div></label><div className="cost-example"><span>EVENT ESTIMATE</span><strong>{value && Number(value) > 0 ? `Rs. ${(Number(value) * 100).toLocaleString('en-IN')}` : 'Not set'}</strong><small>Example total for 100 guests</small></div><button className="button-primary" type="submit"><Save size={16} /> {saved ? 'Estimate saved' : 'Save cost setting'}</button></form></section><aside className="cost-guidance"><span className="guidance-icon"><Info size={18} /></span><h3>Your numbers, always.</h3><p>This is an optional planning estimate you enter yourself. It does not calculate ingredient costs or change recipe quantities.</p><p>Cost estimates are saved on this device and can be updated at any time.</p></aside></div>
  </div>
}