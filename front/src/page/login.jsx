import Cookies from 'universal-cookie';
import axios from 'axios';
import logo from '../img/icons8-fox-64.png';
import pinceaux from '../img/kisspng-black-and-white-brush-painting-brush-stroke-5abbda192e6fb1.4642533115222605051902.png'

function Login() {
  const cookies = new Cookies();
  const searchParams = new URLSearchParams(document.location.search)
  if (searchParams.get("code") !== null) {
    const changeToken = async () => {
      try {
        const data = `client_id=${process.env.REACT_APP_KEY_CLIENT}&client_secret=${process.env.REACT_APP_KEY_PRIVATE}&code=${searchParams.get("code")}&redirect_uri=http://localhost:3000/`;
        const config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
        await axios.post("https://api.betaseries.com/oauth/access_token", data, config)
          .then((response) => {
            cookies.set('token', response.data.access_token)
            window.location.href = 'http://localhost:3000'

          })

      } catch (err) {
        console.log("err = ", err)
      }
    }
    changeToken()
  }
  return (
    <div className="login flex center items-center">
      <div className='container-login'>
        <div className='flex center'>
          <div className='flex center mg-top-2 pinceau'>
            <p className='cl-red fts-2 mg-bottom-1 bold'>FLEXOR</p>
            <img src={logo} alt="logo" className='logo' />
          </div>
        </div>
        <div className='flex center mg-top-10'>
          <a className='fts-2' href="https://www.betaseries.com/authorize?client_id=d60da5bb872f&redirect_uri=http://localhost:3000/">
            <button className='fts-2 cl-white pointer'>
              register
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
