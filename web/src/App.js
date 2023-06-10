//import logo from './logo.svg';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SqlApi from "./pages/SqlApi";

function App() {
  return (
    <Routes>       
      <Route path="/api" element={<SqlApi/>}></Route>          
      <Route exact path="/" element={ <Home />}></Route>
      
    </Routes>
  );
}

export default App;
