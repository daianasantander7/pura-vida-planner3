import { ExternalLink, Star, Wifi, Car, Coffee, Waves, Wind, Check, X, MapPin } from 'lucide-react'
import { HOTELS, TOTAL_ACCOMMODATION } from '../data/hotels'
import clsx from 'clsx'

function AmenityBadge({ ok, icon: Icon, label }) {
  return (
    <div className={clsx(
      'flex items-center gap-1 text-xs px-2 py-1 rounded-lg',
      ok ? 'bg-celadon-50 dark:bg-celadon-700/20 text-celadon-700 dark:text-celadon-400' : 'bg-bark-100 dark:bg-bark-700/50 text-bark-400 dark:text-bark-500 line-through'
    )}>
      <Icon size={11} />
      <span>{label}</span>
    </div>
  )
}

function HotelCard({ hotel }) {
  return (
    <div className="card overflow-hidden hover:shadow-float transition-all duration-300 animate-fade-up">
      {/* Image header */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-display font-bold text-white text-lg leading-tight">{hotel.name}</h3>
              <p className="text-white/80 text-xs flex items-center gap-1 mt-0.5">
                <MapPin size={11} />{hotel.city} · {hotel.area}
              </p>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-lg">${hotel.pricePerNight}</div>
              <div className="text-white/70 text-[10px]">/noche</div>
            </div>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="badge bg-white/90 text-bark-700 text-[10px]">{hotel.type}</span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold text-bark-800">{hotel.rating}</span>
            <span className="text-[10px] text-bark-500">({hotel.reviews})</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Stay info */}
        <div className="flex items-center justify-between bg-bark-50 dark:bg-bark-700/30 rounded-xl px-3 py-2">
          <div className="text-xs text-bark-600 dark:text-bark-400">
            <span className="font-semibold text-bark-900 dark:text-white">{hotel.nights} noches</span> · Check-in {hotel.checkIn}
          </div>
          <div className="text-sm font-bold text-celadon-600 dark:text-celadon-400">Total: ${hotel.priceTotal}</div>
        </div>

        {/* Best for */}
        <p className="text-xs text-bark-600 dark:text-bark-400 italic">{hotel.bestFor}</p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5">
          <AmenityBadge ok={hotel.wifi} icon={Wifi} label="WiFi" />
          <AmenityBadge ok={hotel.parking} icon={Car} label="Parking" />
          <AmenityBadge ok={hotel.breakfast} icon={Coffee} label="Desayuno" />
          <AmenityBadge ok={hotel.pool} icon={Waves} label="Piscina" />
          <AmenityBadge ok={hotel.ac} icon={Wind} label="A/C" />
        </div>

        {/* Pros/Cons */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] font-semibold text-celadon-600 dark:text-celadon-400 uppercase tracking-wider mb-1.5">Pros</div>
            <div className="space-y-1">
              {hotel.pros.slice(0, 2).map((p, i) => (
                <div key={i} className="flex gap-1.5 items-start text-xs text-bark-600 dark:text-bark-400">
                  <Check size={11} className="text-celadon-500 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-coral-500 uppercase tracking-wider mb-1.5">Contras</div>
            <div className="space-y-1">
              {hotel.cons.slice(0, 2).map((c, i) => (
                <div key={i} className="flex gap-1.5 items-start text-xs text-bark-600 dark:text-bark-400">
                  <X size={11} className="text-coral-400 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-2 pt-1">
          <a href={hotel.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary text-xs flex-1 text-center flex items-center justify-center gap-1.5">
            <ExternalLink size={12} /> Booking
          </a>
          <a href={hotel.mapsUrl} target="_blank" rel="noreferrer" className="btn-secondary text-xs flex-1 text-center flex items-center justify-center gap-1.5">
            <MapPin size={12} /> Maps
          </a>
        </div>
      </div>
    </div>
  )
}

export default function HotelsPage() {
  return (
    <div className="space-y-5 max-w-6xl mx-auto animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="section-title">Alojamientos 🏨</h1>
          <p className="text-sm text-bark-500 dark:text-bark-400 mt-1">6 propiedades · 15 noches en total</p>
        </div>
        <div className="card px-4 py-3 text-right">
          <div className="text-xs text-bark-500 dark:text-bark-400">Total alojamiento</div>
          <div className="font-display font-bold text-xl text-bark-900 dark:text-white">${TOTAL_ACCOMMODATION}</div>
          <div className="text-xs text-celadon-600 dark:text-celadon-400">${Math.round(TOTAL_ACCOMMODATION / 3)} / persona</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {HOTELS.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
      </div>
    </div>
  )
}
