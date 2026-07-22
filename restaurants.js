@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', system-ui, sans-serif; }
  h1, h2, h3 { font-family: 'Playfair Display', Georgia, serif; }
}

@layer components {
  .badge {
    @apply inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full;
  }
  .btn-primary {
    @apply bg-green-800 hover:bg-green-900 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 active:scale-95;
  }
  .btn-secondary {
    @apply bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium px-4 py-2 rounded-xl transition-all duration-200;
  }
}

/* Card — defined in plain CSS to avoid @apply issues with custom colors */
.card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.07);
  border: 1px solid #e8dfcf;
}
.dark .card {
  background: #3d2b1f;
  border-color: #5a3e30;
}
.stat-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.07);
  border: 1px solid #e8dfcf;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.dark .stat-card {
  background: #3d2b1f;
  border-color: #5a3e30;
}
.section-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a0f07;
}
.dark .section-title {
  color: white;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  color: #7c6960;
  text-decoration: none;
}
.dark .nav-link {
  color: #d4c5bc;
}
.nav-link:hover {
  background: #e9f5ee;
  color: #2d6a4f;
}
.dark .nav-link:hover {
  background: rgba(27,67,50,0.3);
  color: #74c69d;
}
.nav-link.active {
  background: #e9f5ee;
  color: #2d6a4f;
}
.dark .nav-link.active {
  background: rgba(27,67,50,0.4);
  color: #74c69d;
}

/* Leaflet overrides */
.leaflet-container { border-radius: 1rem; }
.leaflet-popup-content-wrapper { border-radius: 12px !important; box-shadow: 0 8px 32px rgba(0,0,0,0.15) !important; }
.leaflet-popup-content { margin: 12px 16px !important; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #c6e6d2; border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: #52b788; }

/* Stagger */
.stagger-1 { animation-delay: 0.05s; }
.stagger-2 { animation-delay: 0.10s; }
.stagger-3 { animation-delay: 0.15s; }
.stagger-4 { animation-delay: 0.20s; }
.stagger-5 { animation-delay: 0.25s; }
.stagger-6 { animation-delay: 0.30s; }
