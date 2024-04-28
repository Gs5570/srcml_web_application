import Header from '../components/Header';
import '../styles/header.css';
import srclLogo from '../../public/media/srcmlLogo.svg';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

import '../styles/login.css';

import { useForm } from 'react-hook-form';
export default function Login() {
  const { register, handleSubmit, reset } = useForm();

  //URL
  const backEndURl = `${import.meta.env.VITE_BACK_END_URL}/user/auth`;
  const role = 'user';

  const onSubmit = (data) => {
    Axios.post(backEndURl, { ...data, role: role }).then((response) =>
      console.log(response)
    );
  };
  return (
    <div>
      <Header />
      <h1>Please Login</h1>
      <div className="loginForm-container">
        <div className="container-logo">
          <img className="logo-img" src={srclLogo} alt="src ML logo" />
        </div>
        <div className="container-form">
          <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
            <label>
              Username <input type="text" {...register('username')} />
            </label>
            <label>
              Password <input type="text" {...register('password')} />
            </label>
            <NavLink to="/Register">Register</NavLink>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
