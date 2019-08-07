const cacheName = "to-do-pwa";
const cacheList = ['./', './index.html', './css/', './js/', './image/favi.png'];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => {
        return cache.addAll(cacheList);
    }));
});

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        return response || fetch(event.request);
    }));
})