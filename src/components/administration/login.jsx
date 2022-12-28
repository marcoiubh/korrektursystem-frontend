import { loginUser } from '../../services/authenticationService';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import InputHook from '../subcomponents/atomicHooks/InputHook';
import Button from '../subcomponents/atomic/button';
import { LoginSchema } from '../../config/joiSchema';
import ShowPassword from '../subcomponents/atomic/showPassword';
import { toast } from 'react-toastify';
import '../../css/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: joiResolver(LoginSchema) });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  const handleLogin = async (e) => {
    const credentials = {
      email: e.email,
      password: e.password,
    };

    await toast
      .promise(loginUser(credentials), {
        pending: 'Please wait...',
        success: 'You are logged in.',
        error: {
          render({ data: error }) {
            return error.response.data;
          },
        },
      })
      .then(() => {
        navigate('/ticket/overview');
      });
  };

  return (
    <div className=" app_login">
      <form
        className=" app_login_form"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="app_title">
          <h1>Login</h1>
        </div>
        <div className="app_username">
          <InputHook
            property="email"
            obj=""
            register={register}
            errors={errors}
          />
        </div>
        <div className="app_password">
          <InputHook
            property="password"
            obj=""
            type={showPassword ? 'text' : 'password'}
            register={register}
            errors={errors}
          />
        </div>
        <div className=" app_eye">
          <ShowPassword
            state={showPassword}
            onClick={handleShowPassword}
          />
        </div>

        <Button label="Login" color="app_login_button" />
      </form>
    </div>
  );
};

export default Login;
