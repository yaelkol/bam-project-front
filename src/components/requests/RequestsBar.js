import React, { useState } from 'react';
import styles from './RequestsBar.module.css';
import Button from '../ui/Button';

const RequestNavBar = ({ onRequestSelect }) => {
  const [selectedRequest, setSelectedRequest] = useState('השחרה');  
  const requestTypes = ['השחרה', 'כניסה רגלי / רכוב', 'קידוד חוגר', 'חתימה על שו"ס'];

  const handleRequestClick = (requestType) => {
    setSelectedRequest(requestType);  
    onRequestSelect(requestType);     
  };

  return (
    <div>
        <h2>הגשת טופס</h2>
            <div className={styles.navBar}>
            {requestTypes.map((requestType) => (
                <Button
                key={requestType}
                className={`${selectedRequest === requestType ? styles.active : ''}`}
                onClick={() => handleRequestClick(requestType)}
                >
                {requestType}
                </Button>
            ))}
            </div>
    </div>
  );
};

export default RequestNavBar;
