import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from "./page/page";

import "./css/style.css";
import "./css/home.css";
import "./css/navbar.css";
function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Page />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
