
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
function App() {


  return (
    <>
    {/* HEADER AND OUTLET  */}
      <Header />
     <Outlet />
    </>
  )
}

export default App
