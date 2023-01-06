import { loginUser } from '../../services/authenticationService';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import InputForm from '../subcomponents/atomic/InputForm';
import Button from '../subcomponents/atomic/Button';
import { LoginSchema } from '../../config/joiSchema';
import ShowPassword from '../subcomponents/atomic/ShowPassword';
import { toast } from 'react-toastify';
import '../../css/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // initiate react hook form 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    // schema to validate on
    resolver: joiResolver(LoginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  // eye icon
  const handleShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  // login button
  const handleLogin = async (inputValues) => {
    // get form field values
    const credentials = {
      email: inputValues.email,
      password: inputValues.password,
    };

    // log user in and wait for response
    await toast
      .promise(loginUser(credentials), {
        // display notification based on response
        pending: 'Please wait...',
        success: 'You are logged in.',
        error: {
          render({ data: error }) {
            return error.response.data;
          },
        },
      })
      .then(() => {
        // return back to overview when successful
        navigate('/ticket/overview');
      });
  };

  return (
    <div className="login">
      <form
        className="login__form"
        onSubmit={handleSubmit(handleLogin)}
      >
        {/* heading */}
        <div className="login__form__heading">
          <h1>Login</h1>
        </div>

        {/* email */}
        <div className="login__form__username">
          <InputForm
            property="email"
            obj=""
            register={register}
            errors={errors}
          />
        </div>

        {/* password */}
        <div className="login__form__password">
          <InputForm
            property="password"
            obj=""
            type={showPassword ? 'text' : 'password'}
            register={register}
            errors={errors}
          />
        </div>

        {/* eye icon */}
        <div className="login__form__eye">
          <ShowPassword
            state={showPassword}
            onClick={handleShowPassword}
          />
        </div>

        {/* login button */}
        <div className="login__form__button">
          <Button label="Login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
