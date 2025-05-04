import { Link } from "react-router-dom";
import { Context } from "../services/Context";
import { useContext } from "react";
const Header = ()=>{
   const {setTitle} = useContext(Context);
   return(
      <header className="relative font-Karla">
         <div className="background"></div>
         <nav className="p-5 backdrop-blur-sm">
         <h1 className="text-7xl font-KarlaBold mt-5 text-gray-200 text-center"><span className="">NASA</span> Image Gallery</h1>
         </nav>
         <ul className="mt-5 w-[800px] mx-auto p-2 flex items-center justify-around ">
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
      </header>
   )
}
export default Header;