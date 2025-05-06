import { useCallback, useContext, useEffect, useState } from "react";
import { Get_APOD, Get_EARTH, Get_MARS } from "../services/NasaApi";
import { Context } from "../services/Context";
import Loader from "./Loading";
import ReactModal from "react-modal";
import { FaDownload } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { saveToCache } from "../utils/Catch";
import { getFromCache } from "../utils/Catch";
import { useNasaData } from "../hooks/useNasaData";
const NASAGallery = ()=>{
   const {title} = useContext(Context);
   const [refreshFlag,setRefreshFlag] = useState(0);
   const {images,loading,fetchImages} = useNasaData(title,refreshFlag,setRefreshFlag)
   const [selectedImage,setSelectedImage] = useState(null);
   const [isModalOpen,setIsModalOpen] = useState(false);
   const handleRefresh = ()=>{
      setRefreshFlag(1);
      fetchImages();
   }

   const handleImageClick_APOD = (img)=>{
      setSelectedImage(img);
      setIsModalOpen(true);
   }
   const handleImageClick_MARS = (img)=>{
      window.open(img.img_src,"_blank")
   }
   const handleDownload = ()=>{
      if (!selectedImage) return;
      window.open(selectedImage.hdurl || selectedImage.url, '_blank');
   }
   const closeModal = ()=>{
      setIsModalOpen(false)
      setSelectedImage(null);
   }

   
   if(loading) return <Loader/>
   if (!images||images.length === 0) return <div>No images found</div>;
   return(
      <>
      {title ==='APOD'?(

         <section className="container font-Karla mt-2 p-2 gap-8 grid grid-cols-3">
            {images&&images.map((img,index)=>(
               <div onClick={()=>handleImageClick_APOD(img)} key={index} className="relative hover:scale-95 transition-transform cursor-pointer">
                  <img className="w-full h-full rounded object-cover"  src={img.hdurl || img.url} alt="Photo" />
                  <div className="text-gray-200">
                  <p className="absolute line-clamp-1 shadow bg-black/20 p-1 text-sm top-3 left-3">{img.title}</p>
                  <p className="absolute bottom-2 line-clamp-1 right-3 bg-black/20 shadow p-1 font-KarlaBold tracking-wide">{img.date}</p>
                  </div>
               </div>
            ))}
         </section>

         ):(

         <section className="container font-Karla mt-2 p-2 gap-8 grid grid-cols-3">
                  {images&&images?.map((img,index)=>(
                     <div onDoubleClick={()=>{handleImageClick_MARS(img)}} key={index} className="relative cursor-pointer">
                        <img src={img.img_src} className="w-full h-full rounded object-cover" alt="Photo" />
                        <div>
                           <p className="absolute top-3 left-3 bg-black/20 text-gray-200 rounded-sm px-2 py-1">{img?.earth_date || "NODate"}</p>
                           <p className="absolute bottom-2 p-1 rounded text-xs bg-black/20  right-2 text-gray-200">{img?.camera?.name || "NoName"}</p>
                        </div>
                     </div>
                  ))}
         </section>

      )}

<nav className="container flex items-center justify-center bg-gradient-to-tl from-zinc-900 to-zinc-600 p-2">
         <button onClick={handleRefresh} disabled={loading} className="shadow text-xl font-Karla bg-white/5 text-gray-200 px-8 cursor-pointer py-2 rounded">
         {loading ? (
          <span className="animate-spin">↻</span>
        ) : (
          <span>↻ Refresh (Skip Cache)</span>
        )}
         </button>
      </nav>
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