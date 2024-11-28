import React, { useState } from 'react';
import axios from 'axios';
import Button from '../ui/Button'; 
import styles from './RequestForm.module.css'; 
import InputField from '../ui/InputField';

const RequestForm = ({ requestTitle, onSubmit }) => {
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!explanation.trim()) {
      setError('Explanation is required');
      return;
    }
  
    setIsSubmitting(true);
    setError(''); 
  
    try {
      console.log('Sending request to:', 'http://localhost:8080/sendRequest');
  
      const requestData = {
        requestType: requestTitle,
        description: explanation,
      };
  
      console.log('Sending request with data:', requestData);
  
      const storedUser = JSON.parse(localStorage.getItem('user'))?.user;  
      const storedToken = JSON.parse(localStorage.getItem('user')); 
      console.log('Stored user data:', storedUser);  
  
      if (!storedUser) {
        setError('User data not found in local storage');
        setIsSubmitting(false);
        return;
      }
  
      const token = storedToken.token;
      const userId = storedUser._id;
  
      console.log("User ID:", userId);  
  
      if (!token || !userId) {
        setError('Missing token or user ID');
        setIsSubmitting(false);
        return;
      }
  
      console.log("Submitting with userId:", userId);
      console.log("Submitting with token:", token);
  
      const requestPayload = {
        ...requestData,
        userId, 
      };
  
      const response = await axios.post('http://localhost:8080/sendRequest', requestPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Response from server:', response.data);
  
      if (response.status === 201) {
        setExplanation(''); 
        setError(''); 
        onSubmit && onSubmit({ explanation }); 
      }
    } catch (err) {
      console.error('Error sending request:', err?.response?.data || err.message);
      setError(err?.response?.data?.error || 'There was an issue submitting the request');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
      <div className={styles.formContainer}>
        <form className={styles.formContent} onSubmit={handleSubmit}>
          <h3 className={styles.formTitle}>{requestTitle || 'Request Form'}</h3>

          <InputField
            type="text"
            placeholder="הסבר הבקשה..."
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className={styles.inputField}
          />

          {error && <p className={styles.error}>{error}</p>}

          <Button
            type="submit"
            disabled={!explanation.trim() || isSubmitting}
            className={`${styles.submitButton} ${isSubmitting ? styles.loading : ''}`}
          >
            {isSubmitting ? 'מגיש' : 'הגש בקשה'}
          </Button>
        </form>
      </div>
  );
};

export default RequestForm;
