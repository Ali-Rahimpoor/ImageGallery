import { useContext, useEffect, useState } from "react";
import { Get_APOD } from "../services/NasaApi";
import { Context } from "../services/Context";

const NASAGallery = ()=>{
   const {title,setTitle} = useContext(Context);
   
   useEffect(()=>{
      const fetchAPODImages = async ()=>{
        try{
            const {data} = await Get_APOD(1);
            const imageOnly =
             data.filter(item=> item.media_type === "image");
             setImages(imageOnly);
             console.log(imageOnly);
        }catch(err){
         console.error(err);
        }
      }
      fetchAPODImages();
   },[])

   return(
      <>
         {images.map((img)=> (
            <div>
               <p>{img.date}</p>
               <p>{img.title}</p>
               <p>{img.explanation}</p>
               {img.copyright &&
               (<p>
                  {img.copyright}
               </p>)}
                  
                  {img.media_type ==="video"? null:(
                     <img 
                     src={img.hdurl || img.url}
                     alt="PHOTO"
                     className="w-52 h-52"
                     />
                  )}

            </div>
         ))}
      </>
   )
}
export default NASAGallery;