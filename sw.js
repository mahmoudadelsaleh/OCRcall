const CACHE_NAME = 'almas-ocr-v2';
// قائمة الملفات التي سيتم سجنها في ذاكرة الهاتف
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './tesseract.min.js',
  './worker.min.js',
  './tesseract-core.wasm.js',
  './cropper.min.js',
  './cropper.min.css',
  './icon-192x192.png',
  './icon-512x512.png'
];

// مرحلة التثبيت وحفظ الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and storing assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// تشغيل الملفات من الكاش حتى لو مفيش نت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الكاش نرجعه، وإلا نطلبه من النت
        return response || fetch(event.request);
      })
  );
});
