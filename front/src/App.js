import Cookies from 'universal-cookie';
import Page from "./page/page";
import Login from './page/login';

import "./css/style.css";
import "./css/home.css";
import "./css/navbar.css";
import "./css/select.css";
import "./css/login.css";

function App() {
  const cookies = new Cookies();
  return (
    <div>
      {cookies.get('token') === undefined ? 
      (
        <Login/>
      ) : (
        <Page/>
      )}
    </div>
  );
}

export default App;
