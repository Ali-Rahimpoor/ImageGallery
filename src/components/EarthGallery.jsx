import { useEffect, useState } from "react";
import { Get_EARTH } from "../services/NasaApi";
import {SkeletonLoader} from "./SkeletonLoader";
import { getFromCache, saveToCache } from "../utils/Catch";
const EarthGallery = ()=>{
   const [images,setImages] = useState([]);
   const [loading,setLoading] = useState(false);
   const [imageLoaded,setImageLoaded] = useState({});
   const fetchImages = async()=>{
      try{
         setLoading(true);

         const Earth_cacheKey = 'earth_data';
         const cachedEarth = getFromCache(Earth_cacheKey);
         if(cachedEarth){
            setImages(cachedEarth);
            return;
         }
         const data = Get_EARTH();
         setImages(data);
         saveToCache(Earth_cacheKey,data);
         setImageLoaded({});
      }catch(err){
         console.error(err);
         throw new Error(err);
      }finally{
         setLoading(false);
      }
   }
  useEffect(()=>{
   fetchImages();
  },[])
   const handleRefresh = ()=>{
      localStorage.removeItem('earth_data');
      fetchImages();
   }
   const handleDownload = (img)=>{
         window.open(img.url,"_blank")
   }
   const handleImageLoad = (index) => {
      setImageLoaded(prev => ({ ...prev, [index]: true }));
    };
  

   if(loading||images.length===0) return <SkeletonLoader/>
   return(
      <>
      <section className="mt-1 p-2 grid sm:grid-cols-3 grid-cols-2 gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative group">
            {/* Skeleton for each image */}
            {!imageLoaded[index] && (
              <div className="absolute inset-0 animate-pulse bg-gray-700 rounded"></div>
            )}
            
            {/* Actual image */}
            <img
              onDoubleClick={() => handleDownload(img)}
              src={img.url}
              className={`object-cover rounded w-full h-48 transition-opacity duration-300 ${
                imageLoaded[index] ? 'opacity-100' : 'opacity-0'
              }`}
              alt="Earth from space"
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
      </section>
      <nav className=" flex items-center justify-center bg-gradient-to-tl from-zinc-900 to-zinc-600 p-2">
         <button onClick={handleRefresh} disabled={loading} className="shadow text-xl font-Karla bg-white/5 text-gray-200 px-8 cursor-pointer py-2 rounded">
         {loading ? (
          <span className="animate-spin">↻</span>
        ) : (
          <span className="text-sm sm:text-lg">↻ Refresh</span>
        )}
         </button>
      </nav>
      </>
   )

}
export default EarthGallery;