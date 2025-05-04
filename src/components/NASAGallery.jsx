import { useCallback, useContext, useEffect, useState } from "react";
import { Get_APOD, Get_EARTH, Get_MARS } from "../services/NasaApi";
import { Context } from "../services/Context";
import Loader from "./Loading";
import ReactModal from "react-modal";
import { FaDownload } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
const NASAGallery = ()=>{
   const {title} = useContext(Context);
   const [loading,setLoading] = useState(false);
   const [images,setImages] = useState([]);
   const [selectedImage,setSelectedImage] = useState(null);
   const [isModalOpen,setIsModalOpen] = useState(false);
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

   const handleImageClick = (img)=>{
      setSelectedImage(img);
      setIsModalOpen(true);
   }
   const handleDownload = ()=>{
      if (!selectedImage) return;

      window.open(selectedImage.hdurl || selectedImage.url, '_blank');

      // const imageUrl = selectedImage.hdurl || selectedImage.url;
      // const link = document.createElement('a');
      // link.href = imageUrl;
      // link.download = `nasa-${selectedImage.date || 'image'}.jpg`;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
   }
   const closeModal = ()=>{
      setIsModalOpen(false)
      setSelectedImage(null);
   }

   if(loading) return <Loader/>
   if (!images||images.length === 0) return <div>No images found</div>;
   return(
      <>
         <section className="container font-Karla mt-5 p-2 gap-8 grid grid-cols-3">
            {images&&images.map((img,index)=>(
               <div onClick={()=>handleImageClick(img)} key={index} className="relative hover:scale-95 transition-transform cursor-pointer">
                  <img className="w-full h-full rounded object-cover"  src={img.hdurl || img.url} alt="Photo" />
                  <div className="text-gray-200">
                  <p className="absolute line-clamp-1 shadow bg-black/20 p-1 text-sm top-3 left-3">{img.title}</p>
                  <p className="absolute bottom-2 line-clamp-1 right-3 bg-black/20 shadow p-1 font-KarlaBold tracking-wide">{img.date}</p>
                  </div>
               </div>
            ))}
         </section>
            <ReactModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="modal"
            overlayClassName='overlay'
            contentLabel="Image Modal"
            >
               {selectedImage &&(
                   <div className="relative w-[700px] h-[700px] "
                 
                   >
                   <img 
                      src={selectedImage.hdurl || selectedImage.url} 
                      alt={"PHOTO"} 
                      className="object-cover w-full h-full rounded-sm"
                   />
                   <div className="flex items-center gap-10 text-zinc-900 justify-around left-5 absolute top-5 bg-white/30 p-3 rounded">
                   <button onClick={closeModal} className="cursor-pointer">
                        <IoClose className="w-14 h-14 rounded-xl p-1" />
                   </button>
                   <p className="text-2xl">{selectedImage.copyright}</p>
                   <button onClick={handleDownload} className="cursor-pointer">
                     <FaDownload className="w-14 h-14 rounded-xl p-2" />
                   </button>
                   </div>
                   <p className="absolute bottom-0 text-zinc-800 bg-white/40 px-6 line-clamp-3">{selectedImage?.explanation}</p>
                </div>
               )}
            </ReactModal>
      </>
   )
}
export default NASAGallery;