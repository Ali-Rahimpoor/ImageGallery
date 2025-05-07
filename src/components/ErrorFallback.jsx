function ErrorFallback({error, resetErrorBoundary}) {
   return (
     <div className="p-4 bg-red-100 border border-red-400 text-red-700 w-[300px] mx-auto mt-10 rounded">
       <h2 className="font-bold text-lg">Something went wrong:</h2>
       <pre className="whitespace-pre-wrap">{error.message}</pre>
       <button
         onClick={resetErrorBoundary}
         className="mt-2 px-4 py-2  bg-red-500 text-white rounded hover:bg-red-600"
       >
         Try again
       </button>
     </div>
   );
 }
 export default ErrorFallback;