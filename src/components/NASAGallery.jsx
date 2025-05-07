import {  useContext, useState } from "react";
import { Context } from "../services/Context";
// import ReactModal from "react-modal";
// import { FaDownload } from "react-icons/fa6";
// import { IoClose } from "react-icons/io5";
import { useNasaData } from "../hooks/useNasaData";
import {SkeletonItem} from "./SkeletonLoader";
import { Link } from "react-router-dom";
const NASAGallery = () => {
  const { title } = useContext(Context);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const { images, loading, fetchImages } = useNasaData(title, refreshFlag, setRefreshFlag);
//   const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRefresh = () => {
    setRefreshFlag(prev => prev +1);
  };
  const justHandleRefresh = ()=>{
   fetchImages();
  }

  const handleImageClick_APOD = (img) => {
    window.open(img.hdurl || img.url, "_blank");
  };

  const handleImageClick_MARS = (img) => {
    window.open(img.img_src, "_blank");
  };

//   const handleDownload = () => {
//     if (!selectedImage) return;
//     window.open(selectedImage.hdurl || selectedImage.url, '_blank');
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedImage(null);
//   };

  if (loading) {
    return (
      <>
        <section className="container font-Karla mt-2 p-2 md:gap-8 xs:gap-7 gap-4 grid grid-cols-2 sm:grid-cols-3">
          {Array.from({ length: title === 'APOD' ? 9 : 18 }).map((_, index) => (
            <SkeletonItem key={index} />
          ))}
        </section>
        <nav className="flex items-center justify-center bg-gradient-to-tl from-zinc-900 to-zinc-600 p-2">
          <button disabled className="shadow text-xl font-Karla bg-white/5 text-gray-200 px-8 py-2 rounded">
            <span className="animate-spin">↻</span>
          </button>
        </nav>
      </>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-400 text-lg">No images found</p>
        <button 
          className="mt-4 shadow text-xl font-Karla bg-black/75 text-gray-200 px-8 py-2 rounded"
        >
         <Link to='/home'>
          ↻ Try Again
         </Link>
        </button>
      </div>
    );
  }

  return (
    <>
      {title === 'APOD' ? (
        <section className="container font-Karla mt-2 p-2 md:gap-8 xs:gap-7 gap-4 grid grid-cols-2 sm:grid-cols-3">
          {images.map((img, index) => (
            <div 
              onDoubleClick={() => handleImageClick_APOD(img)} 
              key={index} 
              className="relative sm:hover:scale-95 sm:transition-transform cursor-pointer"
            >
              <img 
                className="w-full h-fit rounded-md object-cover" 
                src={img.hdurl || img.url} 
                alt="Photo" 
                loading="lazy"
              />
              <div className="text-gray-200">
                <p className="absolute line-clamp-1 shadow md:text-sm bg-black/20 p-1 text-[10px] xs:text-xs md:top-3 top-1 left-1 md:left-3">
                  {img.title}
                </p>
                <p className="absolute md:bottom-2 bottom-1 text-[9px] xs:text-xs md:text-base line-clamp-1 right-1 md:right-2 bg-black/20 shadow p-1 font-KarlaBold tracking-wide">
                  {img.date}
                </p>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="container font-Karla mt-2 p-2 md:gap-8 xs:gap-7 gap-4 grid grid-cols-2 sm:grid-cols-3">
          {images.map((img, index) => (
            <div 
              onDoubleClick={() => handleImageClick_MARS(img)} 
              key={index} 
              className="relative sm:hover:scale-95 sm:transition-transform cursor-pointer"
            >
              <img 
                src={img.img_src} 
                className="w-full h-fit rounded-md object-cover" 
                alt="Photo" 
                loading="lazy"
              />
              <div>
                <p className="absolute sm:top-3 top-1 left-1 sm:left-3 bg-black/20 text-xs sm:text-base text-gray-200 rounded-sm sm:px-2 px-1 py-1">
                  {img?.earth_date || "NODate"}
                </p>
                <p className="absolute xs:bottom-2 bottom-1 p-1 rounded text-[9px] sm:text-xs bg-black/20 right-1 xs:right-2 text-gray-200">
                  {img?.camera?.name || "NoName"}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      <nav className="flex gap-x-2 items-center justify-center bg-gradient-to-tl from-zinc-900 to-zinc-600 p-2">
        <button 
          onClick={handleRefresh} 
          disabled={loading} 
          className="shadow text-xl font-Karla bg-white/5 text-gray-200 px-8 cursor-pointer py-2 rounded"
        >
          {loading ? (
            <span className="animate-spin">↻</span>
          ) : (
            <span className="xs:text-base text-sm">(Skip Cache)</span>
          )}
        </button>
        <button 
          onClick={justHandleRefresh} 
          disabled={loading} 
          className="shadow text-xl font-Karla bg-white/5 text-gray-200 px-8 cursor-pointer py-2 rounded"
        >
          {loading ? (
            <span className="animate-spin">↻</span>
          ) : (
            <span className="xs:text-base text-sm">↻ Refresh</span>
          )}
        </button>
      </nav>
         {/* Not Used */}
      {/* <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName='overlay'
        contentLabel="Image Modal"
      >
        {selectedImage && (
          <div className="relative w-[700px] h-[700px]">
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
            <p className="absolute bottom-0 text-zinc-800 bg-white/40 px-6 line-clamp-3">
              {selectedImage?.explanation}
            </p>
          </div>
        )}
      </ReactModal> */}
    </>
  );
};

export default NASAGallery;