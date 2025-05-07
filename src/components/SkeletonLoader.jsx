export const SkeletonLoader = () => {
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
 
export const SkeletonItem = () => (
   <div className="relative animate-pulse">
     <div className="w-full h-full rounded-md bg-gray-700 aspect-square"></div>
     <div className="absolute inset-0 flex flex-col justify-between p-2">
       <div className="h-4 w-3/4 bg-gray-600 rounded"></div>
       <div className="h-4 w-1/2 bg-gray-600 rounded self-end"></div>
     </div>
   </div>
 );