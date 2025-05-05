export const saveToCache = (key, data, ttl = 24 * 60 * 60 * 1000) => {
   const cacheData = {
     data,
     timestamp: new Date().getTime(),
     ttl
   };
   localStorage.setItem(key, JSON.stringify(cacheData));
 };
 
 // تابع بازیابی از کش
 export const getFromCache = (key) => {
   const cachedData = localStorage.getItem(key);
   if (!cachedData) return null;
 
   const parsedData = JSON.parse(cachedData);
   const now = new Date().getTime();
 
   // بررسی انقضای کش
   if (now - parsedData.timestamp > parsedData.ttl) {
     localStorage.removeItem(key);
     return null;
   }
 
   return parsedData.data;
 };