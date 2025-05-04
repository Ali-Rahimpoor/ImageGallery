import Header from "./components/Header"
import { Routes,Route,Navigate } from "react-router-dom"
import Home from "./components/Home"
import { Context } from "./services/Context"
import { useState } from "react"
import React,{Suspense,lazy} from "react"
import Loading from "./components/Loading"
const Lazy_NASAGallery = lazy(()=> import('./components/NASAGallery'))
function App() {
  const [title,setTitle] = useState(null);
  return (
    <Context.Provider value={{
        title,
        setTitle
    }} >

      <Header/>

      <main>
        <Routes>
          <Route 
          path="/"
          element={<Navigate to={'/home'}/>}
          />
          <Route
          path="/home"
          element={<Home/>}
          />
          <Route
          path="/Gallery"
          element={
          <Suspense fallback={<Loading/>} >
            <Lazy_NASAGallery/>
          </Suspense>}
          />
        </Routes>
      </main>
    
    </Context.Provider>
  )
}

export default App
