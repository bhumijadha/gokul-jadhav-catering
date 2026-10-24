import { Check, Instagram, MapPin, Phone, Save, Settings } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import type { BusinessSettings } from '../types'

type Props = { settings: BusinessSettings; onChange: (settings: BusinessSettings) => void }

export default function SettingsPage({ settings, onChange }: Props) {
  const [form, setForm] = useState(settings)
  const [saved, setSaved] = useState(false)
  useEffect(() => setForm(settings), [settings])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onChange({ ...form, phone: form.phone.replace(/\D/g, ''), instagram: form.instagram.replace(/^@/, '') })
    setSaved(true)
  }

  return <div className="page-wrap">
    <div className="page-title-row"><div><div className="eyebrow"><span className="eyebrow-line" /> BUSINESS PROFILE</div><h1>Settings</h1><p>Update the details shown across your public website.</p></div><span className="count-pill"><Settings size={14} /> Profile</span></div>
    <div className="settings-layout"><section className="panel settings-panel"><div className="form-section-head"><div className="quick-link-icon"><Settings size={19} /></div><div><h2>Business details</h2><p>These details appear on your catering website.</p></div></div><form className="settings-form" onSubmit={submit}><label>Business name<input value={form.businessName} onChange={(event) => { setForm({ ...form, businessName: event.target.value }); setSaved(false) }} required /></label><label><span className="label-with-icon"><Phone size={14} /> Phone number</span><input type="tel" value={form.phone} onChange={(event) => { setForm({ ...form, phone: event.target.value }); setSaved(false) }} required /></label><label><span className="label-with-icon"><Instagram size={14} /> Instagram username</span><div className="prefix-input"><span>@</span><input value={form.instagram} onChange={(event) => { setForm({ ...form, instagram: event.target.value.replace(/^@/, '') }); setSaved(false) }} /></div></label><label><span className="label-with-icon"><MapPin size={14} /> Service area</span><input value={form.location} onChange={(event) => { setForm({ ...form, location: event.target.value }); setSaved(false) }} placeholder="City or service area (optional)" /></label><button className="button-primary settings-save" type="submit">{saved ? <Check size={16} /> : <Save size={16} />}{saved ? 'Profile saved' : 'Save business details'}</button></form></section><aside className="cost-guidance"><span className="guidance-icon"><Check size={18} /></span><h3>Your profile, reflected.</h3><p>Business name, phone and Instagram details feed directly into the public home page.</p><p>Changes are stored in this browser on this device.</p><div className="profile-preview"><span>PUBLIC NAME</span><strong>{form.businessName || 'Your business name'}</strong><small>{form.phone || 'Phone number'} · @{form.instagram || 'instagram'}</small></div></aside></div>
  </div>
}