import { ExternalLink, MapPin, Star, Car, Waves } from 'lucide-react'
import { BEACHES } from '../data/excursions'
import clsx from 'clsx'

function Tag({ ok, label, emoji }) {
  if (!ok) return null
  return (
    <span className="badge bg-ocean-300/10 text-ocean-500 dark:text-ocean-300 text-[10px]">{emoji} {label}</span>
  )
}

export default function BeachesPage() {
  return (
    <div className="space-y-5 max-w-5xl mx-auto animate-fade-in">
      <div>
        <h1 className="section-title">Playas 🏖️</h1>
        <p className="text-sm text-bark-500 dark:text-bark-400 mt-1">Las mejores playas de la ruta — Pacífico Central y Sur</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {BEACHES.map((b, i) => (
          <div key={b.id} className={clsx('card overflow-hidden hover:shadow-float transition-shadow animate-fade-up', `stagger-${i+1}`)}>
            <div className="h-40 bg-gradient-to-br from-ocean-300/30 to-celadon-400/30 relative flex items-center justify-center">
              <span className="text-6xl">🏖️</span>
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                  <Star size={11} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold text-bark-800">{b.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-display font-bold text-bark-900 dark:text-white text-lg">{b.name}</h3>
                <p className="text-xs text-bark-500 dark:text-bark-400 flex items-center gap-1 mt-0.5">
                  <MapPin size={11} />{b.region}
                </p>
              </div>

              <p className="text-sm text-bark-600 dark:text-bark-400">{b.description}</p>

              {/* Activities */}
              <div className="flex flex-wrap gap-1.5">
                <Tag ok={b.swimming} emoji="🏊" label="Nado" />
                <Tag ok={b.surf} emoji="🏄" label="Surf" />
                <Tag ok={b.snorkel} emoji="🤿" label="Snorkel" />
                <Tag ok={b.sunset} emoji="🌅" label="Sunset" />
                <Tag ok={b.parking} emoji="🅿️" label="Parking" />
              </div>

              <div className="bg-sand-100/70 dark:bg-sand-700/10 rounded-xl px-3 py-2.5">
                <div className="text-[10px] font-semibold text-sand-600 dark:text-sand-400 uppercase tracking-wider mb-1">Mejor hora</div>
                <p className="text-xs text-sand-700 dark:text-sand-300">{b.bestTimeToVisit}</p>
              </div>

              <div className="bg-coral-400/10 rounded-xl px-3 py-2.5">
                <div className="text-[10px] font-semibold text-coral-500 uppercase tracking-wider mb-1">💡 Tip</div>
                <p className="text-xs text-bark-600 dark:text-bark-400">{b.tip}</p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className={clsx(
                  'text-xs font-medium px-2.5 py-1 rounded-full',
                  b.crowded.includes('Alto') ? 'bg-coral-400/10 text-coral-500' :
                  b.crowded.includes('Bajo') ? 'bg-celadon-50 text-celadon-700' :
                  'bg-sand-100 text-sand-700'
                )}>
                  👥 {b.crowded}
                </span>
                <a href={b.mapsUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-medium text-celadon-600 dark:text-celadon-400 hover:underline">
                  <ExternalLink size={11} /> Ver en Maps
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
