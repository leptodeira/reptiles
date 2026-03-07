// Service Worker — Anfibios de Colombia v2026.3.7.1248
// Generado automáticamente por construir_estilo_icono_1.py
// Estrategia: Cache-first con actualización en background

const CACHE = 'reptiles-co-v2026.3.7.1248';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Solo cachear peticiones GET del mismo origen o CDN de fuentes
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp && resp.status === 200) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => cached || new Response('Sin conexión', {status: 503}));
    })
  );
});
