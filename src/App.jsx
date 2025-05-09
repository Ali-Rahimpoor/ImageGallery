import Header from "./components/Header"
import { Routes,Route,Navigate } from "react-router-dom"
import Home from "./components/Home"
import { Context } from "./services/Context"
import { useState } from "react"
import React,{Suspense,lazy} from "react"
import Loader from "./components/Loading"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./components/ErrorFallback"
const Lazy_NASAGallery = lazy(()=> import('./components/NASAGallery'));
const Lazy_EarthGallery = lazy(()=> import('./components/EarthGallery'));
function App() {
  const [title,setTitle] = useState(null);

  const handleReset = ()=>{
    Navigate('/home')
  }
  return (
    <Context.Provider value={{
        title,
        setTitle
    }} >
      <Header/>
      <main>
        <Routes>
          <Route 
          path="/ImageGallery"
          element={<Navigate to={'/home'}/>}
          />
          <Route
          path="/home"
          element={<Home/>}
          />
          <Route
          path="/Gallery"
          element={
            <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={handleReset}
            onError={(err,info)=>{
              console.error(err,info)
            }}
            >
              <Suspense fallback={<Loader/>} >
                <Lazy_NASAGallery/>
              </Suspense>
            </ErrorBoundary>}
          />
          <Route path="/Gallery-Earth"
          element={
          <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          onError={(err,info)=>{
            console.error(err,info)
          }}
          >
            <Suspense fallback={<Loader/>}>
              <Lazy_EarthGallery/>
            </Suspense>
          </ErrorBoundary>} />
        </Routes>
      </main>
    
    </Context.Provider>
  )
}

export default App
