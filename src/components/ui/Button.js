import React from 'react';
import styles from './Button.module.css'; 

const Button = ({ children, className, type, ...props }) => {
  return (
    <button className={`${styles.button} ${className}`} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
