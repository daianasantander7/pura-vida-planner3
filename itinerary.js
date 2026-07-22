import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard, Map, CalendarDays, Hotel, UtensilsCrossed,
  Compass, Wallet, Users, Backpack, BookCheck, Sun, Moon, Menu, X,
  Waves, TreePine
} from 'lucide-react'
import { useDarkMode } from './hooks/useDarkMode'
import clsx from 'clsx'

import Dashboard from './pages/Dashboard'
import MapPage from './pages/MapPage'
import ItineraryPage from './pages/ItineraryPage'
import HotelsPage from './pages/HotelsPage'
import RestaurantsPage from './pages/RestaurantsPage'
import ExcursionsPage from './pages/ExcursionsPage'
import BudgetPage from './pages/BudgetPage'
import SharedExpenses from './pages/SharedExpenses'
import PackingList from './pages/PackingList'
import ReservationsPage from './pages/ReservationsPage'
import BeachesPage from './pages/BeachesPage'

const NAV = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/mapa', icon: Map, label: 'Mapa' },
  { to: '/itinerario', icon: CalendarDays, label: 'Itinerario' },
  { to: '/hoteles', icon: Hotel, label: 'Hoteles' },
  { to: '/restaurantes', icon: UtensilsCrossed, label: 'Restaurantes' },
  { to: '/excursiones', icon: Compass, label: 'Excursiones' },
  { to: '/playas', icon: Waves, label: 'Playas' },
  { to: '/presupuesto', icon: Wallet, label: 'Presupuesto' },
  { to: '/gastos', icon: Users, label: 'Gastos Compartidos' },
  { to: '/equipaje', icon: Backpack, label: 'Equipaje' },
  { to: '/reservas', icon: BookCheck, label: 'Reservas' },
]

export default function App() {
  const [dark, setDark] = useDarkMode()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden bg-cream dark:bg-bark-900 font-body">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        'fixed lg:static inset-y-0 left-0 z-30 w-64 flex flex-col bg-white dark:bg-bark-800 border-r border-bark-100 dark:border-bark-700 transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-bark-100 dark:border-bark-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-jungle-500 to-celadon-500 flex items-center justify-center">
              <TreePine size={16} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-bark-900 dark:text-white leading-none">Pura Vida</div>
              <div className="text-[10px] text-celadon-600 dark:text-celadon-400 font-medium tracking-wide">Costa Rica 2026</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-lg hover:bg-bark-100 dark:hover:bg-bark-700">
            <X size={18} className="text-bark-500" />
          </button>
        </div>

        {/* Travelers pill */}
        <div className="px-4 py-3 border-b border-bark-100 dark:border-bark-700">
          <div className="flex items-center gap-1.5 bg-jungle-50 dark:bg-jungle-700/30 rounded-xl px-3 py-2">
            <div className="flex -space-x-1.5">
              {['D','J','G'].map((l, i) => (
                <div key={l} className={clsx(
                  'w-6 h-6 rounded-full border-2 border-white dark:border-bark-800 flex items-center justify-center text-[10px] font-bold text-white',
                  i === 0 ? 'bg-coral-500' : i === 1 ? 'bg-ocean-500' : 'bg-sand-500'
                )}>{l}</div>
              ))}
            </div>
            <span className="text-xs font-medium text-jungle-700 dark:text-celadon-400">Dai · Juli · Gonza</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          {NAV.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => clsx('nav-link', isActive && 'active')}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Dark mode */}
        <div className="p-4 border-t border-bark-100 dark:border-bark-700">
          <button
            onClick={() => setDark(d => !d)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-bark-600 dark:text-bark-200 hover:bg-bark-100 dark:hover:bg-bark-700 transition-all"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            <span>{dark ? 'Modo claro' : 'Modo oscuro'}</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar mobile */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white dark:bg-bark-800 border-b border-bark-100 dark:border-bark-700">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg hover:bg-bark-100 dark:hover:bg-bark-700">
            <Menu size={20} className="text-bark-600 dark:text-bark-300" />
          </button>
          <span className="font-display font-bold text-bark-900 dark:text-white">Pura Vida 🌿</span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mapa" element={<MapPage />} />
            <Route path="/itinerario" element={<ItineraryPage />} />
            <Route path="/hoteles" element={<HotelsPage />} />
            <Route path="/restaurantes" element={<RestaurantsPage />} />
            <Route path="/excursiones" element={<ExcursionsPage />} />
            <Route path="/playas" element={<BeachesPage />} />
            <Route path="/presupuesto" element={<BudgetPage />} />
            <Route path="/gastos" element={<SharedExpenses />} />
            <Route path="/equipaje" element={<PackingList />} />
            <Route path="/reservas" element={<ReservationsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
