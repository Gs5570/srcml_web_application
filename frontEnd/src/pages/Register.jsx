import Header from '../components/Header';
import '../components/Header';
import srclLogo from '../../public/media/srcmlLogo.svg';
import { useForm } from 'react-hook-form';
import '../styles/login.css';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [toggleLoginPage, setToggleLoginPage] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  //URL
  const backEndURl = `${import.meta.env.VITE_BACK_END_URL}/user/register`;
  console.log(backEndURl);

  //role
  const role = 'user';

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Axios();

    Axios.post(backEndURl, { ...data, role: role }).then((response) =>
      console.log(response)
    );

    // reset();
    navigate('/login');
  };

  return (
    <div>
      <Header />
      <h1>Please Register</h1>
      <div className="loginForm-container">
        <div className="container-logo">
          <img src={srclLogo} alt="src ML logo" />
        </div>
        <div className="container-form">
          <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
            <label>
              email <input type="email" {...register('email')} />
            </label>
            <label>
              Username <input type="text" {...register('username')} />
            </label>
            <label>
              Password <input type="text" {...register('password')} />
            </label>
            {/* <label>
              Confirm password{' '}
              <input type="text" {...register('confirmPass')} />
            </label> */}
            <button
              onClick={() => {
                // onSubmit();
                // reset();
              }}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
