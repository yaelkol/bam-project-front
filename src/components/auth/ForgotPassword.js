import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState('');
  const [motherMaidenName, setMotherMaidenName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerifyIdentity = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8080/users/forgot-password', {
        email,
        motherMaidenName,
        idNumber,
      });
      setMessage(response.data.message);
      setResetToken(response.data.resetToken); 
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to verify identity. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8080/users/reset-password', {
        resetToken,
        newPassword,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 3000); 
    } catch (err) {
      setError(err.response?.data?.error || 'משהו השתבש. נסה שנית');
    }
  };

  return (
    <div className={styles.authContainer}>
      {step === 1 && (
        <form onSubmit={handleVerifyIdentity} className={styles.form}>
          <h2>שכחת סיסמה</h2>
          <InputField
            type="email"
            placeholder="אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            type="text"
            placeholder="שם נעורים של אמך"
            value={motherMaidenName}
            onChange={(e) => setMotherMaidenName(e.target.value)}
            required
          />
          <InputField
            type="text"
            placeholder="תעודת זהות"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}
          <Button type="submit">
            וודא נתונים
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword} className={styles.form}>
          <h2>איפוס סיסמה</h2>
          <InputField
            type="password"
            placeholder="סיסמה חדשה"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}
          <Button type="submit">
            אפס סיסמה
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
