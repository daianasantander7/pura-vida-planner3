import { ExternalLink, Star, Clock, Zap, CheckCircle2, XCircle, ThumbsUp } from 'lucide-react'
import { EXCURSIONS } from '../data/excursions'
import clsx from 'clsx'

const DIFF_COLORS = {
  'Sin dificultad': 'bg-celadon-50 dark:bg-celadon-700/20 text-celadon-700 dark:text-celadon-400',
  'Fácil': 'bg-celadon-50 dark:bg-celadon-700/20 text-celadon-700 dark:text-celadon-400',
  'Fácil-Moderado': 'bg-sand-100 dark:bg-sand-700/20 text-sand-700 dark:text-sand-400',
  'Fácil (se puede hacer sin experiencia)': 'bg-celadon-50 dark:bg-celadon-700/20 text-celadon-700 dark:text-celadon-400',
  'Moderado': 'bg-sand-100 dark:bg-sand-700/20 text-sand-700 dark:text-sand-400',
}

const CAT_EMOJI = {
  naturaleza: '🌿',
  aventura: '🪂',
  relajacion: '♨️',
  'vida-marina': '🐋',
}

export default function ExcursionsPage() {
  const total = EXCURSIONS.reduce((s, e) => s + e.price, 0)

  return (
    <div className="space-y-5 max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="section-title">Excursiones 🧭</h1>
          <p className="text-sm text-bark-500 dark:text-bark-400 mt-1">{EXCURSIONS.length} actividades seleccionadas</p>
        </div>
        <div className="card px-4 py-3 text-right">
          <div className="text-xs text-bark-500 dark:text-bark-400">Total excursiones</div>
          <div className="font-display font-bold text-xl text-bark-900 dark:text-white">${total * 3}</div>
          <div className="text-xs text-celadon-600 dark:text-celadon-400">${total} / persona</div>
        </div>
      </div>

      <div className="space-y-4">
        {EXCURSIONS.map((ex, i) => (
          <div key={ex.id} className={clsx('card p-5 hover:shadow-float transition-shadow animate-fade-up', `stagger-${Math.min(i+1,6)}`)}>
            <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
              {/* Icon + category */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-jungle-500 to-celadon-400 flex items-center justify-center text-2xl shrink-0">
                {ex.emoji}
              </div>

              <div className="flex-1 min-w-0 space-y-3">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="font-display font-bold text-bark-900 dark:text-white">{ex.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <span className={clsx('badge text-[10px]', DIFF_COLORS[ex.difficulty] || 'bg-bark-100 text-bark-600')}>
                        {ex.difficulty}
                      </span>
                      {ex.worthIt && (
                        <span className="badge bg-coral-400/10 text-coral-500 text-[10px]">
                          <ThumbsUp size={10} /> Vale la pena
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-bark-500 dark:text-bark-400 flex-wrap">
                    <span>{CAT_EMOJI[ex.category]} {ex.location}</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{ex.duration}</span>
                    <span className="flex items-center gap-1"><Star size={10} className="text-yellow-400 fill-yellow-400" />{ex.rating} ({ex.reviews})</span>
                  </div>
                </div>

                {/* Price + company + best time */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="text-2xl font-display font-bold text-celadon-600 dark:text-celadon-400">${ex.price}<span className="text-sm font-normal text-bark-400">/persona</span></div>
                  <div className="text-xs text-bark-500 dark:text-bark-400">
                    <span className="font-medium">{ex.company}</span>
                  </div>
                  <div className="text-xs bg-sand-100 dark:bg-sand-700/20 text-sand-700 dark:text-sand-300 px-2.5 py-1 rounded-full">
                    ⏰ {ex.bestTime}
                  </div>
                </div>

                {/* Included / not included */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] font-semibold text-celadon-600 dark:text-celadon-400 uppercase tracking-wider mb-1.5">Incluye</div>
                    <div className="space-y-1">
                      {ex.included.map((item, j) => (
                        <div key={j} className="flex items-start gap-1.5 text-xs text-bark-600 dark:text-bark-400">
                          <CheckCircle2 size={11} className="text-celadon-500 shrink-0 mt-0.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-bark-400 dark:text-bark-500 uppercase tracking-wider mb-1.5">No incluye</div>
                    <div className="space-y-1">
                      {ex.notIncluded.map((item, j) => (
                        <div key={j} className="flex items-start gap-1.5 text-xs text-bark-500 dark:text-bark-500">
                          <XCircle size={11} className="text-bark-300 dark:text-bark-600 shrink-0 mt-0.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review summary + links */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <p className="text-xs text-bark-500 dark:text-bark-400 italic flex-1">"{ex.reviewSummary}"</p>
                  <a href={ex.bookingUrl} target="_blank" rel="noreferrer"
                    className="btn-primary text-xs flex items-center gap-1.5 shrink-0">
                    <ExternalLink size={12} /> Reservar
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
