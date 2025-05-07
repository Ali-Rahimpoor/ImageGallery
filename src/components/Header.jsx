import { Link } from "react-router-dom";
import { Context } from "../services/Context";
import { useContext } from "react";
import Gif1_url from '../assets/gif/Animation - 1746471371619.gif'
import Gif2_url from '../assets/gif/Animation - 1746471410498.gif'
import Gif3_url from '../assets/gif/Animation - 1746471503889.gif'
import Gif4_url from '../assets/gif/Animation - 1746472263806.gif'
import HeaderImg3_url from '../assets/Image/pexels-pixabay-2150.jpg'
import { Swiper,SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay} from 'swiper/modules';
const Header = ()=>{
   const {setTitle} = useContext(Context);
   return(
      <header className="relative font-Karla bg-black w-full text-gray-200">
         <h1 className="font-Londrina text-gray-300 text-center text-7xl border-b border-gray-600 p-10">
            Image Gallery
         </h1>
         {/* Header content */}
         <section className="flex mt-10 mx-auto w-[1200px]  justify-between items-center">  
            <div className="flex items-start justify-between gap-x-2">  

               <img className="w-75 h-fit rounded-full" loading="lazy" src={HeaderImg3_url} alt="Photo" />

               <div>
                  <h3 className="text-6xl ">The sky begins here 
                  </h3>
                  <p className="text-xl mt-2 pl-2">
                  Images from space, for moments of silence and wonder
                  </p>
                  <p className="text-xl pl-2">Look. Enjoy</p>
                  <p className="text-xl pl-2"> Welcome to the galaxy</p>
               </div>
           </div>
           <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}            
            modules={[Autoplay]}
            className="w-[200px] h-[200px] cursor-help rounded-full overflow-hidden border border-gray-600"
           >
             <SwiperSlide className="pt-10 pl-10">
             <img loading="lazy" className="w-25" src={Gif3_url} alt="" />
             </SwiperSlide>
             <SwiperSlide className="pt-10 pl-5">
                <img loading="lazy" className="w-30" src={Gif4_url} alt="" />
             </SwiperSlide>
             <SwiperSlide className="pt-15 pl-8">
                <img loading="lazy" src={Gif2_url} alt="" />
             </SwiperSlide>
           </Swiper>
         </section>
         {/* Nav for select Title */}
         <nav className="w-[400px] font-Roboto text-2xl mx-auto ">
            <h2 className="text-center border-b mb-2 ">Choose a Title</h2>
            <ul className="flex justify-between items-center ">
               <li className="bg-indigo-700 hover:pb-8 transition-all p-3 font-RobotoBold tracking-wider text-lg rounded-md rounded-b-none">
                  <Link className="py-10 px-2"  to="/Gallery" onClick={()=>setTitle('APOD')}>APOD</Link>
               </li>
               <li className="bg-emerald-700 font-RobotoBold tracking-wider text-lg p-3 rounded-md rounded-b-none hover:pb-8 transition-all">
                  <Link className="py-10 px-5" to="/Gallery-Earth">Earth</Link>
               </li>
               <li className="text-lg font-RobotoBold  bg-amber-700 p-3 rounded-md rounded-b-none hover:pb-8 transition-all">
                  <Link className="py-10 px-2"  to="/Gallery" onClick={()=>setTitle('MARS')}>MARS</Link>
               </li>
            </ul>
         </nav>
         {/* Logo */}
         <figure className="">
            {/* Logo */}
            <Link to='/home'>
               <img className="fixed z-20 w-25 cursor-pointer left-4 top-4" src={Gif1_url} alt="Logo" />
            </Link>
         </figure>
      </header>
   )
}
export default Header;