import { useContext, useEffect, useState } from "react";
import { Context } from "../services/Context";
import { Get_EARTH } from "../services/NasaApi";
import Loader from "./Loading";
const EarthGallery = ()=>{
   const [images,setImages] = useState([]);
   const [loading,setLoading] = useState(false);

   useEffect(()=>{
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
      fetchImages();
   },[])
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
      </>
   )

}
export default EarthGallery;