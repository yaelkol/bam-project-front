import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ label, type = 'text', placeholder, value, onChange, required = false }) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;
