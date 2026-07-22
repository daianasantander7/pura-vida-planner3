import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { BUDGET_CATEGORIES, getBudgetSummary, TRIP_DAYS } from '../data/budget'
import { ITINERARY } from '../data/itinerary'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white dark:bg-bark-800 border border-bark-200 dark:border-bark-700 rounded-xl px-4 py-3 shadow-float text-sm">
      <div className="font-semibold text-bark-900 dark:text-white">{d.emoji} {d.name}</div>
      <div className="text-bark-500 dark:text-bark-400">Total: ${d.totalTrip}</div>
      <div className="text-celadon-600 dark:text-celadon-400">Por persona: ${d.perPerson}</div>
    </div>
  )
}

export default function BudgetPage() {
  const budget = getBudgetSummary()

  const dayData = ITINERARY.map(d => ({
    day: `D${d.day}`,
    total: d.budget.total,
    accommodation: d.budget.accommodation,
    food: d.budget.food,
    activities: d.budget.activities,
    transport: d.budget.transport,
  }))

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      <div>
        <h1 className="section-title">Presupuesto 💰</h1>
        <p className="text-sm text-bark-500 dark:text-bark-400 mt-1">Desglose completo del viaje · 15 días</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="stat-card">
          <div className="text-xs text-bark-500 dark:text-bark-400">Total viaje</div>
          <div className="text-2xl font-display font-bold text-bark-900 dark:text-white">${budget.total.toLocaleString()}</div>
          <div className="text-xs text-bark-400 dark:text-bark-500">3 personas</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-bark-500 dark:text-bark-400">Por persona</div>
          <div className="text-2xl font-display font-bold text-celadon-600 dark:text-celadon-400">${budget.perPerson.toFixed(0)}</div>
          <div className="text-xs text-bark-400 dark:text-bark-500">USD estimado</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-bark-500 dark:text-bark-400">Por día/persona</div>
          <div className="text-2xl font-display font-bold text-bark-900 dark:text-white">${Math.round(budget.perPerson / TRIP_DAYS)}</div>
          <div className="text-xs text-bark-400 dark:text-bark-500">promedio</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-bark-500 dark:text-bark-400">En pesos arg.</div>
          <div className="text-2xl font-display font-bold text-bark-900 dark:text-white">~${(budget.perPerson * 1050).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</div>
          <div className="text-xs text-bark-400 dark:text-bark-500">approx. TC 1050</div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Pie chart */}
        <div className="card p-5">
          <h2 className="font-display font-bold text-base text-bark-900 dark:text-white mb-4">Distribución por categoría</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={BUDGET_CATEGORIES} dataKey="totalTrip" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {BUDGET_CATEGORIES.map((cat, i) => (
                  <Cell key={cat.id} fill={cat.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-1.5 mt-3">
            {BUDGET_CATEGORIES.map(cat => (
              <div key={cat.id} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cat.color }} />
                <span className="text-bark-600 dark:text-bark-400">{cat.emoji} {cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Day by day bar */}
        <div className="card p-5">
          <h2 className="font-display font-bold text-base text-bark-900 dark:text-white mb-4">Gasto por día (estimado)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dayData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{ background: 'var(--tw-bg-opacity)', borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: 12 }}
              />
              <Bar dataKey="accommodation" stackId="a" fill="#0077B6" name="Alojam." radius={[0,0,0,0]} />
              <Bar dataKey="food" stackId="a" fill="#52B788" name="Comida" />
              <Bar dataKey="activities" stackId="a" fill="#F4A261" name="Activid." />
              <Bar dataKey="transport" stackId="a" fill="#48CAE4" name="Transport." radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="card p-5">
        <h2 className="font-display font-bold text-base text-bark-900 dark:text-white mb-4">Detalle por categoría</h2>
        <div className="space-y-4">
          {BUDGET_CATEGORIES.map(cat => (
            <div key={cat.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cat.emoji}</span>
                  <div>
                    <div className="font-semibold text-sm text-bark-800 dark:text-bark-200">{cat.name}</div>
                    <div className="text-xs text-bark-500 dark:text-bark-400">{cat.notes}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-bark-900 dark:text-white">${cat.totalTrip}</div>
                  <div className="text-xs text-celadon-600 dark:text-celadon-400">${cat.perPerson}/persona</div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 bg-bark-100 dark:bg-bark-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${(cat.totalTrip / budget.total * 100).toFixed(0)}%`, background: cat.color }}
                />
              </div>
              {/* Items */}
              <div className="mt-2 grid md:grid-cols-2 gap-1">
                {cat.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs text-bark-500 dark:text-bark-500 py-0.5">
                    <span>{item.name}</span>
                    <span className="font-medium text-bark-700 dark:text-bark-400">${item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4 bg-celadon-50 dark:bg-celadon-700/20 border-celadon-200 dark:border-celadon-700">
        <p className="text-sm text-celadon-700 dark:text-celadon-300">
          <strong>📌 Nota:</strong> Presupuesto estimado para enero 2026 en temporada alta. Los vuelos pueden variar. Reservar con anticipación puede bajar el costo total hasta un 20%.
        </p>
      </div>
    </div>
  )
}
