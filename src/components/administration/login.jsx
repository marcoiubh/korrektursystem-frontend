import { loginUser } from '../../services/authenticationService';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import InputForm from '../subcomponents/atomic/InputForm';
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
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(LoginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  const handleLogin = async (inputValues) => {
    const credentials = {
      email: inputValues.email,
      password: inputValues.password,
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
    <div className="login">
      <form
        className="login__form"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="login__form__heading">
          <h1>Login</h1>
        </div>
        <div className="login__form__username">
          <InputForm
            property="email"
            obj=""
            register={register}
            errors={errors}
          />
        </div>
        <div className="login__form__password">
          <InputForm
            property="password"
            obj=""
            type={showPassword ? 'text' : 'password'}
            register={register}
            errors={errors}
          />
        </div>
        <div className="login__form__eye">
          <ShowPassword
            state={showPassword}
            onClick={handleShowPassword}
          />
        </div>

        <div className="login__form__button">
          <Button label="Login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
