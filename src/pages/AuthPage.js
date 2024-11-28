// Auth.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../../bam-project-front/src/components/auth/Auth.module.css';
import Login from '../components/auth/Login';
import Signup from '../components/auth/SignUp';
import ForgotPassword from '../components/auth/ForgotPassword';

const Auth = () => {
  const [currentView, setCurrentView] = useState('login');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/signup') {
      setCurrentView('signup');
    } else if (path === '/forgot-password') {
      setCurrentView('forgotPassword');
    } else {
      setCurrentView('login');
    }
  }, [location]);

  const handleLoginSuccess = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/requests');
  };

  const handleSignupSuccess = (user) => {
    localStorage.setItem('user', JSON.stringify(user)); 
    navigate('/requests');
  };

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return (
          <Login
            onNavigateSignup={() => navigate('/signup')}
            onNavigateForgotPassword={() => navigate('/forgot-password')}
            onSuccess={handleLoginSuccess}
          />
        );
      case 'signup':
        return (
          <Signup
            onNavigateLogin={() => navigate('/login')}
            onSuccess={handleSignupSuccess} 
          />
        );
      case 'forgotPassword':
        return <ForgotPassword onNavigateLogin={() => navigate('/login')} />;
      default:
        return <Login onNavigateSignup={() => navigate('/signup')} />;
    }
  };

  return <div className={styles.authContainer}>{renderView()}</div>;
};

export default Auth;
