import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import { ITINERARY } from '../data/itinerary'
import { HOTELS } from '../data/hotels'
import { RESTAURANTS } from '../data/restaurants'
import { EXCURSIONS, BEACHES } from '../data/excursions'
import { ExternalLink, MapPin, Star, Clock } from 'lucide-react'
import clsx from 'clsx'

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function makeIcon(emoji, color) {
  return L.divIcon({
    html: `<div style="
      background:${color};
      width:32px;height:32px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);border:2px solid white;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 3px 10px rgba(0,0,0,0.25);
    ">
      <span style="transform:rotate(45deg);font-size:14px">${emoji}</span>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -36],
    className: '',
  })
}

const FILTERS = [
  { id: 'route', label: 'Ruta', emoji: '📍', color: '#1B4332' },
  { id: 'hotels', label: 'Hoteles', emoji: '🏨', color: '#0077B6' },
  { id: 'restaurants', label: 'Restaurantes', emoji: '🍽️', color: '#F4A261' },
  { id: 'excursions', label: 'Excursiones', emoji: '🧭', color: '#52B788' },
  { id: 'beaches', label: 'Playas', emoji: '🏖️', color: '#48CAE4' },
]

function FitBounds({ points }) {
  const map = useMap()
  useEffect(() => {
    if (points.length > 0) map.fitBounds(L.latLngBounds(points), { padding: [40, 40] })
  }, [])
  return null
}

export default function MapPage() {
  const [active, setActive] = useState(new Set(['route', 'hotels', 'restaurants', 'excursions', 'beaches']))

  const toggle = (id) => {
    setActive(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const routePoints = ITINERARY.map(d => [d.lat, d.lng])

  return (
    <div className="space-y-4 max-w-6xl mx-auto animate-fade-in">
      <div>
        <h1 className="section-title">Mapa del viaje 🗺️</h1>
        <p className="text-sm text-bark-500 dark:text-bark-400 mt-1">Todos los lugares de la ruta — hoteles, restaurantes, excursiones y playas</p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => toggle(f.id)}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200',
              active.has(f.id)
                ? 'text-white border-transparent shadow-sm'
                : 'bg-white dark:bg-bark-800 text-bark-500 dark:text-bark-400 border-bark-200 dark:border-bark-600'
            )}
            style={active.has(f.id) ? { background: f.color, borderColor: f.color } : {}}
          >
            {f.emoji} {f.label}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden shadow-float" style={{ height: '580px' }}>
        <MapContainer center={[10.0, -84.2]} zoom={8} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <FitBounds points={routePoints} />

          {/* Route line */}
          {active.has('route') && (
            <Polyline
              positions={routePoints}
              color="#52B788"
              weight={3}
              opacity={0.7}
              dashArray="8 4"
            />
          )}

          {/* Day markers */}
          {active.has('route') && ITINERARY.map(day => (
            <Marker
              key={`day-${day.day}`}
              position={[day.lat, day.lng]}
              icon={makeIcon(day.emoji, '#1B4332')}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <div className="font-bold text-sm mb-1">{day.emoji} Día {day.day}</div>
                  <div className="text-base font-semibold text-gray-800 mb-1">{day.title}</div>
                  <div className="text-xs text-gray-500">{day.date}</div>
                  <div className="text-xs text-gray-600 mt-1">{day.region}</div>
                  <div className="mt-2 text-xs font-semibold text-green-700">Presupuesto día: ${day.budget.total}</div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Hotels */}
          {active.has('hotels') && HOTELS.map(h => (
            <Marker key={h.id} position={[h.lat, h.lng]} icon={makeIcon('🏨', '#0077B6')}>
              <Popup>
                <div className="min-w-[200px]">
                  <div className="font-bold text-sm mb-1">{h.name}</div>
                  <div className="text-xs text-gray-500 mb-1">{h.city} · {h.type}</div>
                  <div className="flex items-center gap-1 text-xs mb-2">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{h.rating}</span>
                    <span className="text-gray-400">({h.reviews} reviews)</span>
                  </div>
                  <div className="text-xs font-semibold text-blue-700">${h.pricePerNight}/noche · {h.nights} noches</div>
                  <a href={h.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-blue-600 mt-2 hover:underline">
                    <ExternalLink size={11} /> Ver en Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Restaurants */}
          {active.has('restaurants') && RESTAURANTS.map(r => (
            <Marker key={r.id} position={[r.lat, r.lng]} icon={makeIcon('🍽️', '#F4A261')}>
              <Popup>
                <div className="min-w-[200px]">
                  <div className="font-bold text-sm mb-1">{r.name}</div>
                  <div className="text-xs text-gray-500 mb-1">{r.cuisine} · {r.priceRange}</div>
                  <div className="flex items-center gap-1 text-xs mb-1">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{r.rating}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1 italic">"{r.tip}"</div>
                  <a href={r.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-orange-600 mt-2 hover:underline">
                    <ExternalLink size={11} /> Ver en Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Excursions */}
          {active.has('excursions') && EXCURSIONS.map(ex => (
            <Marker key={ex.id} position={[ex.lat, ex.lng]} icon={makeIcon('🧭', '#52B788')}>
              <Popup>
                <div className="min-w-[200px]">
                  <div className="font-bold text-sm mb-1">{ex.name}</div>
                  <div className="text-xs text-gray-500 mb-1">{ex.company}</div>
                  <div className="flex items-center gap-2 text-xs mb-1">
                    <span className="font-bold text-green-700">${ex.price}/persona</span>
                    <span className="text-gray-400">· {ex.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span>{ex.rating} ({ex.reviews} reviews)</span>
                  </div>
                  <a href={ex.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-green-700 mt-2 hover:underline">
                    <ExternalLink size={11} /> Reservar
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Beaches */}
          {active.has('beaches') && BEACHES.map(b => (
            <Marker key={b.id} position={[b.lat, b.lng]} icon={makeIcon('🏖️', '#48CAE4')}>
              <Popup>
                <div className="min-w-[200px]">
                  <div className="font-bold text-sm mb-1">{b.name}</div>
                  <div className="text-xs text-gray-500 mb-2">{b.region}</div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {b.swimming && <span className="badge bg-blue-100 text-blue-700 text-[10px]">🏊 Nado</span>}
                    {b.surf && <span className="badge bg-orange-100 text-orange-700 text-[10px]">🏄 Surf</span>}
                    {b.snorkel && <span className="badge bg-teal-100 text-teal-700 text-[10px]">🤿 Snorkel</span>}
                    {b.sunset && <span className="badge bg-pink-100 text-pink-700 text-[10px]">🌅 Sunset</span>}
                  </div>
                  <div className="text-xs text-gray-600 italic">{b.tip}</div>
                  <a href={b.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-cyan-600 mt-2 hover:underline">
                    <ExternalLink size={11} /> Ver en Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="card p-4">
        <div className="text-xs font-semibold text-bark-500 dark:text-bark-400 uppercase tracking-wider mb-3">Leyenda</div>
        <div className="flex flex-wrap gap-4">
          {FILTERS.map(f => (
            <div key={f.id} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: f.color }} />
              <span className="text-xs text-bark-600 dark:text-bark-400">{f.emoji} {f.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-0.5 border-t-2 border-dashed border-celadon-500" />
            <span className="text-xs text-bark-600 dark:text-bark-400">Ruta del viaje</span>
          </div>
        </div>
      </div>
    </div>
  )
}
