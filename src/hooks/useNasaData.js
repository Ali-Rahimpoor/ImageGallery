import { useState, useEffect, useCallback } from 'react';
import { Get_APOD, Get_MARS, Get_EARTH } from '../services/NasaApi';
import { saveToCache, getFromCache } from '../utils/Catch';

export const useNasaData = (title,refreshFlag,setRefreshFlag) =>{
   const [loading,setLoading] = useState(false);
   const [images,setImages] = useState([]);

   const fetchImages = useCallback(async ()=>{
      try{
         setLoading(true);
         setImages([]);

         if(refreshFlag > 0){
            localStorage.removeItem('apod_data');
            localStorage.removeItem('mars_photos');
         }

         switch (title){
            case "APOD":
           
          const apodCacheKey = 'apod_data';
          const cachedAPOD = getFromCache(apodCacheKey);
          if (cachedAPOD) {
            setImages(cachedAPOD.sort(() => 0.5 - Math.random()).slice(0, 9));
            return;
          }
         
          const { data: apodData } = await Get_APOD();
          saveToCache(apodCacheKey, apodData);
          setImages(apodData.sort(() => 0.5 - Math.random()).slice(0, 9));
          
          break;

          case "MARS":
            const randomSol = Math.floor(Math.random() * 4000);

         
            const marsCacheKey = `mars_photos`;
            const cachedMars = getFromCache(marsCacheKey);
            if (cachedMars) {
              setImages(cachedMars.sort(() => 0.5 - Math.random()).slice(0, 18));
              return;
            }
         

            const { data: marsData } = await Get_MARS(randomSol);
            saveToCache(marsCacheKey, marsData.photos);
            setImages(marsData.photos.sort(() => 0.5 - Math.random()).slice(0, 18));
            break;

            default :
            throw new Error('Invalid title');

         }

      }catch(err){
         console.error(err);
      }finally{
         setLoading(false);
         setRefreshFlag(0);
      }
   },[title,refreshFlag]);
   useEffect(()=>{
      fetchImages();
   },[fetchImages])

   return {images,loading,fetchImages};
}