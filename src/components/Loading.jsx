
const Loading = ()=>{

   return(
      <>
<div role="status" className="mt-20">
<div className="flex space-x-2 justify-center items-center">
      <div className="h-3 w-3 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
      <div className="h-3 w-3 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      <div className="h-3 w-3 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
    </div>
    <span class="sr-only">Loading...</span>
</div>
      </>
   )
}
export default Loading;