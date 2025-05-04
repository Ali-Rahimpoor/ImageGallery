import { useContext, useEffect, useState } from "react";
import { Get_APOD, Get_EARTH, Get_MARS } from "../services/NasaApi";
import { Context } from "../services/Context";
import Loading from "./Loading";
const NASAGallery = ()=>{
   const {title} = useContext(Context);
   const [loading,setLoading] = useState(false);
   useEffect(()=>{
      const fetchAPODImages = async ()=>{
        try{
            setLoading(true);
            const {data} = await Get_APOD(1);
            console.log(data)
            const imageOnly =
             data.filter(item=> item.media_type === "image");
             setImages(imageOnly);
            //  console.log(imageOnly);
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
   },[])

   if(loading) return <Loading/>
   return(
      <>
         <section>

         </section>


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