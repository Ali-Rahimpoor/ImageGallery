import NASAGallery from "./components/NASAGallery"
import Header from "./components/Header"
import { Routes,Route,Navigate } from "react-router-dom"
import Home from "./components/Home"
import { Context } from "./services/Context"
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
          element={<NASAGallery/>}
          />
        </Routes>
      </main>
    
    </Context.Provider>
  )
}

export default App
