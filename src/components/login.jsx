import { useNavigate } from 'react-router-dom';
import Joi from 'joi-browser';
import React, { useState } from 'react';
import Input from './subcomponents/input';
import { loginUser } from './services/authenticationService';

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const schema = {
    email: Joi.string().required().email().label('E-mail'),
    password: Joi.string().required().label('Password'),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(credentials, schema, options);
    if (!error) return null;

    for (let item of error.details)
      errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaCopy = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaCopy);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors({ errors: errors || {} });
    if (errors) return;

    try {
      await loginUser(credentials);
      navigate('/tickets');
      window.location.reload(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errorsCopy = { ...errors };
        errorsCopy.email = ex.response.data;
        setErrors(errorsCopy);
      }
    }
  };

  const handleChange = ({ target: input }) => {
    const errorsCopy = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errorsCopy[input.name] = errorMessage;
    else delete errorsCopy[input.name];

    const credentialsCopy = { ...credentials };
    credentialsCopy[input.name] = input.value;
    setCredentials(credentialsCopy);
    setErrors(errorsCopy);
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={credentials.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          name="password"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          error={errors.password}
        />
        <button
          disabled={validate()}
          className="btn btn-outline-primary small"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
