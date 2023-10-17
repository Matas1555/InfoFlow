
import HomePage from "./page_components/home_page";
import About from "./page_components/about";
import Contact from "./page_components/contact";
import Login from "./page_components/login";
import NavBar from './page_components/navbar';
import SideBar from "./page_components/sidebar";
import "./css/main.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return ( 
    <> 
    <NavBar />
    <Routes>
    <Route path="/HomePage" element={<HomePage />} />
    <Route path="/About" element ={<About/>} />
    
    </Routes>
    
    <SideBar />
    </>
  );
}

export default App;
