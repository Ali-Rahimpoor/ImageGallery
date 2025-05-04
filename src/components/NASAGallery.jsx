import { useCallback, useContext, useEffect, useState } from "react";
import { Get_APOD, Get_EARTH, Get_MARS } from "../services/NasaApi";
import { Context } from "../services/Context";
import Loading from "./Loading";
const NASAGallery = ()=>{
   const {title} = useContext(Context);
   const [loading,setLoading] = useState(false);
   const [images,setImages] = useState([]);
   useEffect(()=>{
      const fetchAPODImages =  async ()=>{
        try{
            setLoading(true);
            const {data} = await Get_APOD();
            console.log(data)
            setImages(data);
        }catch(err){
         console.error(err);
        }
        finally{
         setLoading(false)
        }
      }
      const fetchMARSImages = async ()=>{
         try{
            setLoading(true);
            const {data} = await Get_MARS();
            console.log(data);

         }catch(err){
            console.error(err);
         }
         finally{
            setLoading(false)
         }
        
      }
      const fetchEARTHImages = async ()=>{
         try{
            setLoading(true);
            const {data} = await Get_EARTH();
            console.log(data);
         }catch(err){
            console.error(err)
         }
         finally{
            setLoading(false)
         }

      }
      switch(title){
         case "APOD":
            fetchAPODImages();
            break;
         case "MARS":
            fetchMARSImages();
            break;
         case "EARTH":
            fetchEARTHImages();
            break;
         default:
            throw new Error("NO Title");
      }
   },[title])

   if(loading) return <Loading/>
   if (images.length === 0) return <div>No images found</div>;
   return(
      <>
         <section className="container font-Karla mt-5 p-2 gap-8 grid grid-cols-3">
            {images&&images.map((img,index)=>(
               <div key={index} className="relative hover:scale-95 transition-transform cursor-pointer">
                  <img className="w-full h-full rounded object-cover"  src={img.hdurl || img.url} alt="Photo" />
                  <div className="text-gray-200">
                  <p className="absolute line-clamp-1 shadow bg-black/20 p-1 text-sm top-3 left-3">{img.title}</p>
                  <p className="absolute bottom-2 line-clamp-1 right-3 bg-black/20 shadow p-1 font-KarlaBold tracking-wide">{img.date}</p>
                  </div>
               </div>
            ))}
         </section>

      </>
   )
}
export default NASAGallery;