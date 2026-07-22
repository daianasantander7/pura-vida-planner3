import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  CalendarDays, Hotel, Wallet, Compass, MapPin, Clock,
  Car, Utensils, Waves, TrendingUp, CheckCircle2, Circle, AlertCircle
} from 'lucide-react'
import { TRIP, ITINERARY } from '../data/itinerary'
import { HOTELS } from '../data/hotels'
import { BUDGET_CATEGORIES, getBudgetSummary } from '../data/budget'
import { EXCURSIONS } from '../data/excursions'
import clsx from 'clsx'

function Countdown() {
  const [time, setTime] = useState({})

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const target = new Date('2026-01-16T00:00:00')
      const diff = target - now
      if (diff <= 0) {
        setTime({ departed: true })
        return
      }
      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const mins = Math.floor((diff % 3600000) / 60000)
      const secs = Math.floor((diff % 60000) / 1000)
      setTime({ days, hours, mins, secs })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  if (time.departed) {
    return (
      <div className="text-center py-2">
        <span className="text-2xl font-display font-bold text-celadon-500">¡Pura vida! 🌿 Ya están viajando</span>
      </div>
    )
  }

  const units = [
    { label: 'días', value: time.days },
    { label: 'horas', value: time.hours },
    { label: 'min', value: time.mins },
    { label: 'seg', value: time.secs },
  ]

  return (
    <div className="flex items-end gap-3 justify-center flex-wrap">
      {units.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="text-4xl md:text-5xl font-display font-bold text-white leading-none tabular-nums">
            {String(value ?? 0).padStart(2, '0')}
          </div>
          <div className="text-celadon-300 text-xs font-medium mt-1 uppercase tracking-wider">{label}</div>
        </div>
      ))}
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub, color = 'jungle', to }) {
  const colorMap = {
    jungle:  'bg-jungle-50 dark:bg-jungle-700/20 text-jungle-600 dark:text-celadon-400',
    ocean:   'bg-ocean-300/10 text-ocean-500',
    sand:    'bg-sand-100 dark:bg-sand-700/20 text-sand-700 dark:text-sand-300',
    coral:   'bg-coral-400/10 text-coral-500',
    celadon: 'bg-celadon-400/10 text-celadon-600 dark:text-celadon-400',
  }
  const content = (
    <div className="stat-card hover:shadow-float transition-shadow duration-200">
      <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center', colorMap[color])}>
        <Icon size={18} />
      </div>
      <div>
        <div className="text-2xl font-display font-bold text-bark-900 dark:text-white">{value}</div>
        <div className="text-xs font-medium text-bark-500 dark:text-bark-400">{label}</div>
        {sub && <div className="text-[11px] text-bark-400 dark:text-bark-500 mt-0.5">{sub}</div>}
      </div>
    </div>
  )
  return to ? <Link to={to}>{content}</Link> : content
}

function ReservationStatus({ done, total, label }) {
  const pct = Math.round((done / total) * 100)
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-medium text-bark-700 dark:text-bark-300">{label}</span>
          <span className="text-bark-500">{done}/{total}</span>
        </div>
        <div className="h-1.5 bg-bark-100 dark:bg-bark-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-celadon-500 to-jungle-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <span className="text-xs font-bold text-celadon-600 dark:text-celadon-400 w-8 text-right">{pct}%</span>
    </div>
  )
}

export default function Dashboard() {
  const budget = getBudgetSummary()
  const today = new Date()

  const currentDay = ITINERARY.find(d => {
    const date = parseISO(d.date)
    return format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
  })

  const upcomingDays = ITINERARY.filter(d => parseISO(d.date) >= today).slice(0, 3)

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">

      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-jungle-700 via-jungle-600 to-celadon-600 p-6 md:p-8">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />

        <div className="relative">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <p className="text-celadon-300 text-sm font-medium mb-1 uppercase tracking-wider">✈️ Buenos Aires → San José</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Costa Rica 🌿</h1>
              <p className="text-celadon-200 text-sm mt-1">16 — 31 de Enero 2026 · Dai · Juli · Gonza</p>
            </div>
            <div className="text-right">
              <div className="text-celadon-300 text-xs mb-1">Duración</div>
              <div className="text-white font-display font-bold text-2xl">15 noches</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
            <p className="text-celadon-200 text-xs text-center mb-4 uppercase tracking-widest font-medium">Faltan...</p>
            <Countdown />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Hotel} label="Hoteles" value={HOTELS.length} sub="confirmados" color="jungle" to="/hoteles" />
        <StatCard icon={Compass} label="Excursiones" value={EXCURSIONS.length} sub="planeadas" color="ocean" to="/excursiones" />
        <StatCard icon={Wallet} label="Por persona" value={`$${budget.perPerson.toFixed(0)}`} sub="USD estimado" color="sand" to="/presupuesto" />
        <StatCard icon={Car} label="Km de ruta" value="~950" sub="en 4x4" color="celadon" />
      </div>

      {/* Main content grid */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Itinerary preview */}
        <div className="md:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg text-bark-900 dark:text-white">Próximos días</h2>
            <Link to="/itinerario" className="text-xs font-medium text-celadon-600 dark:text-celadon-400 hover:underline">Ver todo →</Link>
          </div>
          <div className="space-y-3">
            {ITINERARY.map((day, i) => {
              const isToday = currentDay?.day === day.day
              const isPast = parseISO(day.date) < today && !isToday
              return (
                <div
                  key={day.day}
                  className={clsx(
                    'flex items-start gap-3 p-3 rounded-xl transition-colors',
                    isToday ? 'bg-celadon-50 dark:bg-celadon-700/20 border border-celadon-200 dark:border-celadon-700' : 'hover:bg-bark-50 dark:hover:bg-bark-700/30',
                    isPast && 'opacity-50'
                  )}
                >
                  <div className={clsx(
                    'w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0',
                    isToday ? 'bg-celadon-500 text-white' : 'bg-bark-100 dark:bg-bark-700 text-bark-600 dark:text-bark-300'
                  )}>
                    {day.day}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-bark-900 dark:text-white truncate">{day.emoji} {day.title}</span>
                      {isToday && <span className="badge bg-celadon-100 text-celadon-700 dark:bg-celadon-700/40 dark:text-celadon-300 text-[10px]">HOY</span>}
                    </div>
                    <div className="text-xs text-bark-500 dark:text-bark-400 mt-0.5 flex items-center gap-1">
                      <MapPin size={10} />
                      <span>{day.region}</span>
                      <span className="mx-1">·</span>
                      <span>{format(parseISO(day.date), 'd MMM', { locale: es })}</span>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-bark-500 dark:text-bark-400 shrink-0">
                    ${day.budget.total}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Budget overview */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-base text-bark-900 dark:text-white">Presupuesto</h2>
              <Link to="/presupuesto" className="text-xs font-medium text-celadon-600 dark:text-celadon-400 hover:underline">Detalle →</Link>
            </div>
            <div className="text-center py-2 mb-4">
              <div className="text-3xl font-display font-bold text-bark-900 dark:text-white">${budget.perPerson.toFixed(0)}</div>
              <div className="text-xs text-bark-500 dark:text-bark-400">por persona · total ${budget.total.toLocaleString()}</div>
            </div>
            <div className="space-y-2">
              {BUDGET_CATEGORIES.map(cat => (
                <div key={cat.id} className="flex items-center gap-2">
                  <span className="text-sm w-5">{cat.emoji}</span>
                  <div className="flex-1">
                    <div className="h-1.5 bg-bark-100 dark:bg-bark-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(cat.totalTrip / budget.total * 100).toFixed(0)}%`, background: cat.color }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-bark-500 dark:text-bark-400 w-10 text-right">${cat.perPerson}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick checklist */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-base text-bark-900 dark:text-white mb-3">Checklist clave</h2>
            <div className="space-y-2">
              {[
                { label: 'Vuelos comprados', done: false },
                { label: 'Auto alquilado (Adobe)', done: false },
                { label: 'Hoteles reservados', done: false },
                { label: 'Parque MA (sinac.go.cr)', done: false },
                { label: 'Eco Termales reservadas', done: false },
                { label: 'Seguro de viaje', done: false },
                { label: 'SIM tica / eSIM', done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  {item.done
                    ? <CheckCircle2 size={15} className="text-celadon-500 shrink-0" />
                    : <Circle size={15} className="text-bark-300 dark:text-bark-600 shrink-0" />
                  }
                  <span className={clsx(
                    item.done ? 'line-through text-bark-400 dark:text-bark-500' : 'text-bark-700 dark:text-bark-300'
                  )}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Route summary */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-base text-bark-900 dark:text-white mb-3">La ruta</h2>
            <div className="space-y-1.5">
              {[
                { place: 'San José', days: 'Días 1–2 & 11–15', emoji: '🏙️' },
                { place: 'Volcán Arenal', days: 'Días 2–3', emoji: '🌋' },
                { place: 'Monteverde', days: 'Días 4–5', emoji: '🌿' },
                { place: 'Manuel Antonio', days: 'Días 6–8', emoji: '🐒' },
                { place: 'Uvita', days: 'Días 9–10', emoji: '🐋' },
              ].map(({ place, days, emoji }, i, arr) => (
                <div key={place} className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-celadon-100 dark:bg-celadon-700/30 flex items-center justify-center text-xs">{emoji}</div>
                    {i < arr.length - 1 && <div className="w-px h-3 bg-bark-200 dark:bg-bark-700 mt-0.5" />}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-bark-800 dark:text-bark-200">{place}</div>
                    <div className="text-[10px] text-bark-400 dark:text-bark-500">{days}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
