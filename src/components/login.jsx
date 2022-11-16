import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Input from './subcomponents/input';
import { loginUser } from './services/authenticationService';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(credentials);
      navigate('/tickets');
      window.location.reload(false);
    } catch (ex) {}
  };

  const handleChange = ({ target: input }) => {
    const credentialsCopy = { ...credentials };
    credentialsCopy[input.name] = input.value;
    setCredentials(credentialsCopy);
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form className="col-sm-4 mt-lg-5" onSubmit={handleSubmit}>
        <Input
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          value={credentials.password}
          onChange={handleChange}
          type="password"
        />
        <button className="btn btn-outline-primary small">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
