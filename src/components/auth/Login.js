import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Auth.module.css';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

const Login = ({ onNavigateSignup, onNavigateForgotPassword, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8080/users/login';

    try {
      const response = await axios.post(url, { email, password });
      const user = response.data; 
      localStorage.setItem('user', JSON.stringify(user));
      onSuccess(user); 
      navigate('/requests');
    } catch (err) {
      setError('משהו השתבש. נסה שנית');
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>התחברות</h2>

        <InputField
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <Button className={styles.submitButton} type="submit" disabled={!email || !password}>
          התחבר
        </Button>
      </form>

      <p
        className={styles.p}
        onClick={onNavigateSignup} 
      >
        אין לך חשבון? צור חשבון
      </p>

      <p
        className={styles.p}
        onClick={onNavigateForgotPassword}
      >
        שכחת סיסמה?
      </p>
    </div>
  );
};

export default Login;
