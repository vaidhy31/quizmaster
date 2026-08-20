const CACHE='quiztime-v2-0';
const ASSETS=[
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './js/app.js',
  './js/data/quizLoader.js',
  './quizzes/index.json',
  './quizzes/fun-india/quiz.json'
];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(
        keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
      ))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(new URL(e.request.url).origin!==self.location.origin)return;
  e.respondWith(
    fetch(e.request)
      .then(r=>{
        if(e.request.method==='GET'){
          const c=r.clone();
          caches.open(CACHE).then(x=>x.put(e.request,c));
        }
        return r;
      })
      .catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html')))
  );
});
