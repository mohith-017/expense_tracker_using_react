import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { login, register } = useContext(AuthContext);

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError('');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (!userId || !password) {
        return setError('Please fill in all fields');
      }
      await login(userId, password);
    } else {
      if (!name || !userId || !password || !confirmPassword) {
        return setError('Please fill in all fields');
      }
      if (password !== confirmPassword) {
        return setError('Passwords do not match');
      }
      await register(name, userId, password);
    }
  };

  return (
    <section className="auth-form-container">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className="form-control">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-control">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        {error && <p className="error-text">{error}</p>}
        <div className="form-actions">
          <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className="toggle-btn"
            onClick={switchModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;