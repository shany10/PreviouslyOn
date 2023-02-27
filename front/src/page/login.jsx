import Cookies from 'universal-cookie';
import axios from 'axios';
import logo from '../img/icons8-fox-64.png';
import { useState } from 'react';

function Login() {
  localStorage.setItem("page", "")
  const cookies = new Cookies();
  const [form, setForm] = useState({
    name: "",
    password: ""
  })
  const md5 = require('md5');

  const animation = (input) => {
    if (input.value !== "") {
      input.parentNode.classList.add('animation')
    } else if (input.value === "") {
      input.parentNode.classList.remove('animation')
    }
    setForm(oldItem => {
      const newItem = {
        ...oldItem,
        [input.id]: input.value
      }
      return newItem
    })
  }

  const submition = (e) => {
    e.preventDefault()
    axios.post(`https://api.betaseries.com/members/auth?login=${form.name}&password=${md5(form.password)}&key=${process.env.REACT_APP_KEY_CLIENT}`)
      .then((response) => {
        cookies.set("user", response.data.user)
        cookies.set("token", response.data.token)
        window.location.href = 'http://localhost:3000'
      })
      .catch((error) => {
        if (error.response.data.errors[0].text === "Mot de passe incorrect.") {
          const input = document.querySelector('#password')
          input.classList.add('error')
          setTimeout(() => {
            input.classList.remove('error')
          }, 1500);
        } else {
          const input = document.querySelector('#name')
          input.classList.add('error')
          setTimeout(() => {
            input.classList.remove('error')
          }, 1500);
        }
      })
  }

  return (
    <div className="login flex center items-center">
      <form onSubmit={(e) => submition(e)}>
        <div className='flex center'>
          <div className='flex center mg-top-2 pinceau'>
            <p className='cl-red fts-2 mg-bottom-1 bold'>FLEXOR</p>
            <img src={logo} alt="logo" className='logo' />
          </div>
        </div>
        <div className="box-input">
          <label htmlFor="name">name</label>
          <input onChange={(e) => animation(e.target)} type="text" id="name" required maxLength="16" />
        </div>
        <div className="box-input">
          <label htmlFor="password">password</label>
          <input onChange={(e) => animation(e.target)} type="password" id='password' required />
        </div>
        <div className="flex center mg-top-10">
          <button type='submit' className='fts-2 pointer'>
            Login
          </button>
        </div>
      </form>
      {/* <a className='fts-2' href="https://www.betaseries.com/authorize?client_id=d60da5bb872f&redirect_uri=http://localhost:3000/">
            <button className='fts-2 cl-white pointer'>
              register
            </button>
          </a> */}
    </div>
  );
}

export default Login;
