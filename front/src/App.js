import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './page/home';

import "./css/style.css";
import "./css/home.css";
import "./css/navbar.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
