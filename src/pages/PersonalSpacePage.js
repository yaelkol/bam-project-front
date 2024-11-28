import React from 'react';
import NavBar from '../components/ui/NavBar'; 
import ShowRequests from '../components/requests/ShowRequests';
import AdminShowRequests from '../components/requests/AdminShowRequests'

const PersonalSpacePage = () => {
  const storedData = JSON.parse(localStorage.getItem('user'));
  const isAdmin = storedData?.user?.isAdmin === true;

  return (
    <div>
      <NavBar />
      {isAdmin ? <AdminShowRequests /> : <ShowRequests />}
    </div>
  );
};

export default PersonalSpacePage;
