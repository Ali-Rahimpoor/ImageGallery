import { useContext, useEffect, useState } from "react";
import { Get_APOD, Get_EARTH, Get_MARS } from "../services/NasaApi";
import { Context } from "../services/Context";

const NASAGallery = ()=>{
   const {title} = useContext(Context);
   
   useEffect(()=>{
      const fetchAPODImages = async ()=>{
        try{
            const {data} = await Get_APOD(1);
            console.log("APOD"+data)
            const imageOnly =
             data.filter(item=> item.media_type === "image");
             setImages(imageOnly);
            //  console.log(imageOnly);
        }catch(err){
         console.error(err);
        }
      }
      const fetchMARSImages = async ()=>{
         try{
            const {data} = await Get_MARS();
            console.log("MARS"+data);

         }catch(err){
            console.error(err);
         }
        
      }
      const fetchEARTHImages = async ()=>{
         try{
            const {data} = await Get_EARTH();
            console.log(data);
         }catch(err){
            console.error(err)
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
   },[])

   return(
      <>
         {/* {images.map((img)=> (
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

            </div> */}
         {/* ))} */}
      </>
   )
}
export default NASAGallery;