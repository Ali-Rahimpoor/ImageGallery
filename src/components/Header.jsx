import { Link } from "react-router-dom";
const Header = ()=>{

   return(
      <header className="relative font-Karla">
         <div className="background"></div>
         <nav className="p-5 backdrop-blur-sm">
         <h1 className="text-7xl font-KarlaBold mt-5 text-gray-200 text-center"><span className="">NASA</span> Image Gallery</h1>
         </nav>
         <ul className="mt-5 w-[800px] mx-auto p-2 flex items-center justify-around ">
           <li className="group-li">
               <Link to='/Gallery'>
                  APOD
               </Link>
           </li>
           <li className="group-li">
               <Link to="/Gallery">
                  EARTH
               </Link>
           </li>
           <li className="group-li">
               <Link to='/Gallery'>
                     MARS
               </Link>
           </li>
         </ul>
      </header>
   )
}
export default Header;