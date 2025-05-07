const SkeletonLoader = () => {
   return (
     <section className="mt-1 p-2 grid sm:grid-cols-3 grid-cols-2 gap-4">
       {Array(6).fill().map((_, index) => (
         <div key={index} className="animate-pulse">
           <div className="bg-gray-700 rounded h-48 w-full"></div>
         </div>
       ))}
     </section>
   );
 };
 
 export default SkeletonLoader;