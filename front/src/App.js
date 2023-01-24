import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from "./page/page";
import Login from './page/auth';
import Connexion from './page/connexion';

import "./css/style.css";
import "./css/home.css";
import "./css/navbar.css";
function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Page />}></Route>
        <Route exact path='/auth' element={<Login />}></Route>
        <Route path='/connexion' element={<Connexion/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
