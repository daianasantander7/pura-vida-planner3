import { useState } from 'react'
import { Plus, Trash2, Users, TrendingUp, ArrowRight } from 'lucide-react'
import { TRAVELERS, INITIAL_EXPENSES } from '../data/budget'
import clsx from 'clsx'

const TRAVELER_COLORS = { Dai: '#E63946', Juli: '#0077B6', Gonza: '#F4A261' }

function calculateBalances(expenses) {
  const paid = {}
  const owed = {}
  TRAVELERS.forEach(t => { paid[t] = 0; owed[t] = 0 })

  expenses.forEach(exp => {
    const share = exp.amount / exp.splitWith.length
    paid[exp.paidBy] += exp.amount
    exp.splitWith.forEach(t => { owed[t] += share })
  })

  return TRAVELERS.map(t => ({
    name: t,
    paid: paid[t],
    owed: owed[t],
    balance: paid[t] - owed[t],
  }))
}

function calculateSettlements(balances) {
  const debtors = balances.filter(b => b.balance < -0.01).map(b => ({ ...b }))
  const creditors = balances.filter(b => b.balance > 0.01).map(b => ({ ...b }))
  const settlements = []

  let i = 0, j = 0
  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(-debtors[i].balance, creditors[j].balance)
    settlements.push({ from: debtors[i].name, to: creditors[j].name, amount: Math.round(amount * 100) / 100 })
    debtors[i].balance += amount
    creditors[j].balance -= amount
    if (Math.abs(debtors[i].balance) < 0.01) i++
    if (Math.abs(creditors[j].balance) < 0.01) j++
  }
  return settlements
}

export default function SharedExpenses() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES)
  const [form, setForm] = useState({ description: '', amount: '', paidBy: 'Dai', splitWith: [...TRAVELERS], category: 'food', date: '2026-01-16' })
  const [showForm, setShowForm] = useState(false)

  const balances = calculateBalances(expenses)
  const settlements = calculateSettlements(balances)
  const total = expenses.reduce((s, e) => s + e.amount, 0)

  const addExpense = () => {
    if (!form.description || !form.amount) return
    setExpenses(prev => [...prev, {
      id: `e${Date.now()}`,
      ...form,
      amount: parseFloat(form.amount),
    }])
    setForm({ description: '', amount: '', paidBy: 'Dai', splitWith: [...TRAVELERS], category: 'food', date: '2026-01-16' })
    setShowForm(false)
  }

  const removeExpense = (id) => setExpenses(prev => prev.filter(e => e.id !== id))

  const toggleSplit = (traveler) => {
    setForm(prev => ({
      ...prev,
      splitWith: prev.splitWith.includes(traveler)
        ? prev.splitWith.filter(t => t !== traveler)
        : [...prev.splitWith, traveler]
    }))
  }

  return (
    <div className="space-y-5 max-w-4xl mx-auto animate-fade-in">
      <div>
        <h1 className="section-title">Gastos Compartidos 👥</h1>
        <p className="text-sm text-bark-500 dark:text-bark-400 mt-1">Quién pagó, quién debe, cómo se divide</p>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-3 gap-3">
        {balances.map(b => (
          <div key={b.name} className="card p-4 text-center">
            <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
              style={{ background: TRAVELER_COLORS[b.name] }}>
              {b.name[0]}
            </div>
            <div className="font-display font-bold text-bark-900 dark:text-white text-sm">{b.name}</div>
            <div className="text-[10px] text-bark-400 dark:text-bark-500 mt-1">Pagó: ${b.paid.toFixed(2)}</div>
            <div className="text-[10px] text-bark-400 dark:text-bark-500">Le corresponde: ${b.owed.toFixed(2)}</div>
            <div className={clsx(
              'text-base font-bold mt-2',
              b.balance > 0 ? 'text-celadon-600 dark:text-celadon-400' : b.balance < 0 ? 'text-coral-500' : 'text-bark-400'
            )}>
              {b.balance > 0 ? '+' : ''}{b.balance.toFixed(2)}
            </div>
            <div className="text-[10px] text-bark-400 dark:text-bark-500">
              {b.balance > 0 ? 'le deben' : b.balance < 0 ? 'debe' : 'par'}
            </div>
          </div>
        ))}
      </div>

      {/* Settlements */}
      {settlements.length > 0 && (
        <div className="card p-5">
          <h2 className="font-display font-bold text-base text-bark-900 dark:text-white mb-3">Cómo saldar cuentas</h2>
          <div className="space-y-2">
            {settlements.map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-bark-50 dark:bg-bark-700/30 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: TRAVELER_COLORS[s.from] }}>
                  {s.from[0]}
                </div>
                <span className="text-sm text-bark-600 dark:text-bark-400">{s.from} le paga</span>
                <ArrowRight size={14} className="text-celadon-500" />
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: TRAVELER_COLORS[s.to] }}>
                  {s.to[0]}
                </div>
                <span className="text-sm text-bark-600 dark:text-bark-400">{s.to}</span>
                <span className="ml-auto font-display font-bold text-bark-900 dark:text-white">${s.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expense list */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-bold text-base text-bark-900 dark:text-white">Gastos ({expenses.length})</h2>
            <div className="text-xs text-bark-500 dark:text-bark-400">Total registrado: ${total.toFixed(2)}</div>
          </div>
          <button onClick={() => setShowForm(s => !s)} className="btn-primary flex items-center gap-1.5 text-sm">
            <Plus size={15} /> Agregar
          </button>
        </div>

        {/* Add form */}
        {showForm && (
          <div className="bg-bark-50 dark:bg-bark-700/30 rounded-xl p-4 mb-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-bark-600 dark:text-bark-400 mb-1 block">Descripción</label>
                <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Ej: Termas Arenal" className="w-full text-sm border border-bark-200 dark:border-bark-600 rounded-xl px-3 py-2 bg-white dark:bg-bark-800 text-bark-800 dark:text-white" />
              </div>
              <div>
                <label className="text-xs font-medium text-bark-600 dark:text-bark-400 mb-1 block">Monto (USD)</label>
                <input value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                  type="number" placeholder="0.00" className="w-full text-sm border border-bark-200 dark:border-bark-600 rounded-xl px-3 py-2 bg-white dark:bg-bark-800 text-bark-800 dark:text-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-bark-600 dark:text-bark-400 mb-1 block">Pagó</label>
                <select value={form.paidBy} onChange={e => setForm(p => ({ ...p, paidBy: e.target.value }))}
                  className="w-full text-sm border border-bark-200 dark:border-bark-600 rounded-xl px-3 py-2 bg-white dark:bg-bark-800 text-bark-800 dark:text-white">
                  {TRAVELERS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-bark-600 dark:text-bark-400 mb-1 block">Fecha</label>
                <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                  className="w-full text-sm border border-bark-200 dark:border-bark-600 rounded-xl px-3 py-2 bg-white dark:bg-bark-800 text-bark-800 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-bark-600 dark:text-bark-400 mb-1.5 block">Dividir entre</label>
              <div className="flex gap-2">
                {TRAVELERS.map(t => (
                  <button key={t} onClick={() => toggleSplit(t)}
                    className={clsx('flex-1 py-2 rounded-xl text-sm font-medium border transition-all',
                      form.splitWith.includes(t)
                        ? 'text-white border-transparent'
                        : 'bg-white dark:bg-bark-700 text-bark-500 border-bark-200 dark:border-bark-600'
                    )}
                    style={form.splitWith.includes(t) ? { background: TRAVELER_COLORS[t] } : {}}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={addExpense} className="btn-primary flex-1">Agregar gasto</button>
              <button onClick={() => setShowForm(false)} className="btn-secondary">Cancelar</button>
            </div>
          </div>
        )}

        {/* Expense rows */}
        <div className="space-y-2">
          {expenses.map(exp => {
            const share = (exp.amount / exp.splitWith.length).toFixed(2)
            return (
              <div key={exp.id} className="flex items-center gap-3 py-2 border-b border-bark-100 dark:border-bark-700 last:border-0">
                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: TRAVELER_COLORS[exp.paidBy] }}>
                  {exp.paidBy[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-bark-800 dark:text-bark-200 truncate">{exp.description}</div>
                  <div className="text-xs text-bark-400 dark:text-bark-500">{exp.date} · ${share} c/u · {exp.splitWith.join(', ')}</div>
                </div>
                <div className="font-bold text-bark-800 dark:text-bark-200 shrink-0">${exp.amount}</div>
                <button onClick={() => removeExpense(exp.id)} className="p-1.5 rounded-lg hover:bg-coral-400/10 text-bark-400 hover:text-coral-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
