import React, { useState } from 'react';
import NavBar from '../components/ui/NavBar';
import RequestForm from '../components/requests/RequestForm';  
import RequestNavBar from '../components/requests/RequestsBar';  

const RequestPage = () => {
const user = JSON.parse(localStorage.getItem('user'));
  const [selectedRequest, setSelectedRequest] = useState('השחרה');

  const handleRequestSelect = (requestType) => {
    setSelectedRequest(requestType);
  };

  const handleFormSubmit = (data) => {
    console.log('Form submitted with data:', data);
  };

  return (
    <div>
        <NavBar user={user} />
        <RequestNavBar onRequestSelect={handleRequestSelect} />

        <RequestForm 
            requestTitle={selectedRequest} 
            onSubmit={handleFormSubmit} 
        />
    </div>
  );
};

export default RequestPage;
