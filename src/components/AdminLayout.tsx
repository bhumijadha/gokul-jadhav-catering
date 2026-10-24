import { useState } from 'react'
import {
  BookOpenCheck, Calculator, ChartNoAxesCombined, ChevronRight, CircleDollarSign,
  LayoutDashboard, LogOut, Menu, Settings, Utensils, X,
} from 'lucide-react'
import type { AppData } from '../types'
import DashboardPage from '../pages/DashboardPage'
import FoodItemsPage from '../pages/FoodItemsPage'
import RecipePage from '../pages/RecipePage'
import EventCalculatorPage from '../pages/EventCalculatorPage'
import CostSettingsPage from '../pages/CostSettingsPage'
import SettingsPage from '../pages/SettingsPage'

export type AdminSection = 'dashboard' | 'foods' | 'recipes' | 'events' | 'costs' | 'settings'

type Props = {
  data: AppData
  onDataChange: (data: AppData) => void
  onLogout: () => void
  onHome: () => void
}

const navigation: { id: AdminSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'foods', label: 'Food items', icon: Utensils },
  { id: 'recipes', label: 'Recipe quantities', icon: BookOpenCheck },
  { id: 'events', label: 'Event calculator', icon: Calculator },
  { id: 'costs', label: 'Cost settings', icon: CircleDollarSign },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ data, onDataChange, onLogout, onHome }: Props) {
  const [section, setSection] = useState<AdminSection>('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const current = navigation.find((item) => item.id === section)!
  const update = (patch: Partial<AppData>) => onDataChange({ ...data, ...patch })

  function navigate(next: AdminSection) {
    setSection(next)
    setMobileOpen(false)
  }

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${mobileOpen ? 'is-open' : ''}`}>
        <div className="sidebar-brand">
          <img className="brand-logo" src="/gokul-jadhav-logo.svg" alt="Gokul Jadhav Catering" />
          <button className="icon-button mobile-close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X size={19} /></button>
        </div>
        <div className="sidebar-label">WORKSPACE</div>
        <nav className="sidebar-nav" aria-label="Admin navigation">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${section === id ? 'active' : ''}`} onClick={() => navigate(id)}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
              {section === id && <ChevronRight size={15} className="nav-chevron" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-status"><span className="status-dot" /> Your workspace is saved on this device</div>
          <button className="nav-item" onClick={onHome}><ChartNoAxesCombined size={18} /><span>View public website</span></button>
          <button className="nav-item logout-item" onClick={onLogout}><LogOut size={18} /><span>Sign out</span></button>
        </div>
      </aside>
      {mobileOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <main className="admin-main">
        <header className="admin-topbar">
          <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
          <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{current.label}</strong></div>
          <div className="topbar-right"><span className="today-label">CATERING MANAGEMENT</span><div className="avatar">GJ</div></div>
        </header>
        <div className="admin-content">
          {section === 'dashboard' && <DashboardPage data={data} onNavigate={navigate} />}
          {section === 'foods' && <FoodItemsPage foodItems={data.foodItems} onChange={(foodItems) => update({ foodItems })} />}
          {section === 'recipes' && <RecipePage foodItems={data.foodItems} onChange={(foodItems) => update({ foodItems })} />}
          {section === 'events' && <EventCalculatorPage data={data} onEventsChange={(events) => update({ events })} />}
          {section === 'costs' && <CostSettingsPage settings={data.settings} onChange={(settings) => update({ settings })} />}
          {section === 'settings' && <SettingsPage settings={data.settings} onChange={(settings) => update({ settings })} />}
        </div>
      </main>
    </div>
  )
}