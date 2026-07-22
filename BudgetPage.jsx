export const TRAVELERS = ['Dai', 'Juli', 'Gonza']
export const NIGHTS = 15
export const TRIP_DAYS = 15

export const BUDGET_CATEGORIES = [
  {
    id: 'flights',
    name: 'Vuelos',
    emoji: '✈️',
    color: '#0077B6',
    totalTrip: 1200,
    perPerson: 400,
    notes: 'BUE → SJO → BUE ida y vuelta. Copa/Avianca con escala. Precio estimado por persona.',
    items: [
      { name: 'Vuelo BUE → SJO (Dai)', cost: 400, paid: false },
      { name: 'Vuelo BUE → SJO (Juli)', cost: 400, paid: false },
      { name: 'Vuelo BUE → SJO (Gonza)', cost: 400, paid: false },
    ],
  },
  {
    id: 'accommodation',
    name: 'Alojamiento',
    emoji: '🏨',
    color: '#52B788',
    totalTrip: 850,
    perPerson: 283,
    notes: '15 noches divididas entre 3 personas. Mix de B&B, hostel y hotel.',
    items: [
      { name: 'Casa Yoses, San José (1 noche × 3)', cost: 65, paid: false },
      { name: 'Lucky Bug B&B, Arenal (2 noches × 3)', cost: 150, paid: false },
      { name: 'Camino Verde, Monteverde (2 noches × 3)', cost: 120, paid: false },
      { name: 'Backpackers Manuel Antonio (3 noches × 3)', cost: 105, paid: false },
      { name: 'Tucan Hotel, Uvita (2 noches × 3)', cost: 90, paid: false },
      { name: 'Hotel Presidente, San José (4 noches × 3)', cost: 320, paid: false },
    ],
  },
  {
    id: 'car',
    name: 'Auto 4x4',
    emoji: '🚗',
    color: '#F4A261',
    totalTrip: 480,
    perPerson: 160,
    notes: '15 días de alquiler de Toyota RAV4 o similar 4x4. Incluye seguro básico.',
    items: [
      { name: 'Auto 4x4 — Adobe Rent a Car (15 días)', cost: 420, paid: false },
      { name: 'Seguro adicional CDW', cost: 60, paid: false },
    ],
  },
  {
    id: 'fuel',
    name: 'Combustible',
    emoji: '⛽',
    color: '#E63946',
    totalTrip: 210,
    perPerson: 70,
    notes: 'Estimado: ~900 km totales. Gasolina ~$1.20/L en Costa Rica. 4x4 consume ~12L/100km.',
    items: [
      { name: 'Gasolina viaje completo (estimado)', cost: 210, paid: false },
    ],
  },
  {
    id: 'food',
    name: 'Comida',
    emoji: '🍽️',
    color: '#74C69D',
    totalTrip: 2100,
    perPerson: 700,
    notes: '$45/día por persona. Mix de sodas locales, restaurantes medios y 2-3 experiencias gastronómicas.',
    items: [
      { name: 'Comida 15 días (Dai)', cost: 700, paid: false },
      { name: 'Comida 15 días (Juli)', cost: 700, paid: false },
      { name: 'Comida 15 días (Gonza)', cost: 700, paid: false },
    ],
  },
  {
    id: 'activities',
    name: 'Actividades y Parques',
    emoji: '🌿',
    color: '#1B4332',
    totalTrip: 1200,
    perPerson: 400,
    notes: 'Parques nacionales, excursiones, tours. Algunas compartidas entre los 3.',
    items: [
      { name: 'Catarata La Fortuna (×3)', cost: 54, paid: false },
      { name: 'Kayak Lago Arenal (×3)', cost: 105, paid: false },
      { name: 'Parque Nacional Arenal (×3)', cost: 60, paid: false },
      { name: 'Eco Termales (×3)', cost: 135, paid: false },
      { name: 'Transbordador Lago (×3)', cost: 45, paid: false },
      { name: 'Tour Bosque Nuboso Monteverde (×3)', cost: 135, paid: false },
      { name: 'Puentes Colgantes (×3)', cost: 78, paid: false },
      { name: 'Sky Adventures Tirolesas (×3)', cost: 225, paid: false },
      { name: 'Parque Nacional Manuel Antonio (×3)', cost: 60, paid: false },
      { name: 'Kayak Marino Manuel Antonio (×3)', cost: 135, paid: false },
      { name: 'Parque Marino Ballena (×3)', cost: 54, paid: false },
      { name: 'Tour ballenas y delfines (×3)', cost: 225, paid: false },
      { name: 'Volcán Poás entrada (×3)', cost: 54, paid: false },
      { name: 'Museo del Oro + Teatro (×3)', cost: 63, paid: false },
    ],
  },
  {
    id: 'misc',
    name: 'Varios y Emergencias',
    emoji: '🎒',
    color: '#023E8A',
    totalTrip: 450,
    perPerson: 150,
    notes: 'Souvenirs, café, propinas, imprevistos, seguro de viaje.',
    items: [
      { name: 'Seguro de viaje (×3)', cost: 90, paid: false },
      { name: 'Souvenirs y café (×3)', cost: 150, paid: false },
      { name: 'Propinas (×3)', cost: 90, paid: false },
      { name: 'Fondo emergencias', cost: 120, paid: false },
    ],
  },
]

export function getBudgetSummary() {
  const total = BUDGET_CATEGORIES.reduce((s, c) => s + c.totalTrip, 0)
  const perPerson = total / 3
  return { total, perPerson, travelers: 3 }
}

// Shared expenses tracker initial state
export const INITIAL_EXPENSES = [
  { id: 'e1', date: '2026-01-16', description: 'Auto 4x4 Adobe Rent a Car', amount: 420, paidBy: 'Gonza', splitWith: ['Dai', 'Juli', 'Gonza'], category: 'car' },
  { id: 'e2', date: '2026-01-16', description: 'Casa Yoses Hotel (1 noche)', amount: 65, paidBy: 'Dai', splitWith: ['Dai', 'Juli', 'Gonza'], category: 'accommodation' },
  { id: 'e3', date: '2026-01-17', description: 'Lucky Bug B&B (2 noches)', amount: 150, paidBy: 'Juli', splitWith: ['Dai', 'Juli', 'Gonza'], category: 'accommodation' },
  { id: 'e4', date: '2026-01-17', description: 'Catarata La Fortuna', amount: 54, paidBy: 'Dai', splitWith: ['Dai', 'Juli', 'Gonza'], category: 'activities' },
  { id: 'e5', date: '2026-01-18', description: 'Eco Termales', amount: 135, paidBy: 'Gonza', splitWith: ['Dai', 'Juli', 'Gonza'], category: 'activities' },
]
