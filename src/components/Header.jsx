import { Link } from "react-router-dom";
import { Context } from "../services/Context";
import { useContext } from "react";
import Header_svg from '../assets/svg/header.svg?react'
const Header = ()=>{
   const {setTitle} = useContext(Context);
   return(
      <header className="relative font-Karla">
         <div className="background"></div>
         <Header_svg className="size-52 absolute top-5 z-10 left-10" />
         <h1 className=" text-7xl backdrop-blur-md p-4 font-KarlaBold text-zinc-800 bg-white/30 text-center"><span className="">NASA</span> Image Gallery</h1>
         <ul className="mt-10 w-[800px] mx-auto p-2 flex items-center justify-around ">
           <li className="group-li">
               <Link to='/Gallery' onClick={()=>setTitle('APOD')}>
                  APOD
               </Link>
           </li>
           <li className="group-li">
               <Link to="/Gallery" onClick={()=>setTitle("EARTH")}>
                  EARTH
               </Link>
           </li>
           <li className="group-li">
               <Link to='/Gallery' onClick={()=> setTitle('MARS')}>
                     MARS
               </Link>
           </li>
         </ul>
         <div className="border-b mt-14"></div>
      </header>
   )
}
export default Header;