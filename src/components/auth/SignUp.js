import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Auth.module.css';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [motherMaidenName, setMotherMaidenName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8080/users/signup';

    try {
      const response = await axios.post(url, { email, password, name, idNumber, motherMaidenName });
      console.log(response.data); 

      const { email: userEmail, name: userName, idNumber: userIdNumber } = response.data; 
      localStorage.setItem('user', JSON.stringify({ userEmail, userName, userIdNumber }));

      navigate('/requests'); 
    } catch (err) {
      setError('משהו השתבש. נסה שנית');
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>הרמשה</h2>

        <InputField
          type="text"
          placeholder="שם מלא"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputField
          type="text"
          placeholder="תעודת זהות"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />

        <InputField
          type="text"
          placeholder="שם נעורים של אמך"
          value={motherMaidenName}
          onChange={(e) => setMotherMaidenName(e.target.value)}
        />

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

        <Button
          className={styles.button}
          type="submit"
          disabled={!email || !password || !name || !idNumber || !motherMaidenName}
        >
          הרשמה
        </Button>
      </form>

      <p
        className={styles.p}
        onClick={() => navigate('/login')} 
      >
        כבר יש לך חשבון? התחבר
      </p>
    </div>
  );
};

export default Signup;
