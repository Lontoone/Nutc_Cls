import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';

function App() {
  return (
    <Router>
   
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
         </Route>
      </Routes>
    </Router>
  );
}

export default App;
