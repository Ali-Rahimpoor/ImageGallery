import { Link } from "react-router-dom";
import { Context } from "../services/Context";
import { useContext } from "react";
import Header_svg from '../assets/svg/header.svg?react'
import Gif1_url from '../assets/gif/Animation - 1746471371619.gif'
import Gif2_url from '../assets/gif/Animation - 1746471410498.gif'
import Gif3_url from '../assets/gif/Animation - 1746471503889.gif'
import Gif4_url from '../assets/gif/Animation - 1746472263806.gif'
import HeaderImg_url from '../assets/Image/NGC1512inner_Hubble_5413.jpg'
import { FaStar } from "react-icons/fa6";
import { useRef } from "react";
const Header = ()=>{

   const {setTitle} = useContext(Context);
  
   return(
      <header className="relative font-Karla bg-black w-full text-gray-200">
         <h1 className="font-Londrina text-gray-300 text-center text-7xl border-b border-gray-600 p-10">
            Image Gallery
         </h1>
         <section className="flex mt-10 mx-auto w-[1200px] justify-around items-center">  
            <div className="flex gap-x-2">  

               <img className="w-25 h-fit" src={Gif3_url} alt="Gif" />

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
            <img className="rounded-full object-cover w-[400px]" src={HeaderImg_url} alt="" />
         </section>
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
         <figure className="">
            {/* Logo */}
            <Link to='/home'>
               <img className="fixed z-20 w-25 cursor-pointer left-4 top-4" src={Gif1_url} alt="Logo" />
            </Link>
            {/* Animation */}
            <img className="absolute w-25 top-24 right-4" src={Gif2_url} alt="Gif" />
            <img src={Gif4_url} className="absolute bottom-10 right-4" alt="" />
         </figure>
      </header>
   )
}
export default Header;