import { useContext, useEffect, useState } from "react";
import { Context } from "../services/Context";
import { Get_EARTH } from "../services/NasaApi";
import Loader from "./Loading";
const EarthGallery = ()=>{
   const [images,setImages] = useState([]);
   const [loading,setLoading] = useState(false);

   const fetchImages = async()=>{
      try{
         setLoading(true);
         const data = await Get_EARTH();
         setImages(data);
         console.log(data);
      }catch(err){
         console.error(err);
      }finally{
         setLoading(false);
      }
   }
  useEffect(()=>{
   fetchImages();
  },[])
   const handleRefresh = ()=>{
      fetchImages();
   }

   if(loading) return <Loader/>
   return(
      <>
      <section className="mt-1 grid grid-cols-3 gap-3">
         {images&&images.map(img=>(
            <div>
               <img src={img.url} className="object-cover rounded" alt="" />
               <p>{img.author}</p>
            </div>
         ))}
      </section>
      <nav className="container flex items-center justify-center bg-gradient-to-tl from-zinc-900 to-zinc-600 p-2">
         <button onClick={handleRefresh} disabled={loading} className="shadow text-xl font-Karla bg-white/5 text-gray-200 px-8 cursor-pointer py-2 rounded">
         {loading ? (
          <span className="animate-spin">↻</span>
        ) : (
          <span>↻ Refresh</span>
        )}
         </button>
      </nav>
      </>
   )

}
export default EarthGallery;