import React from 'react';

const ProfileButton = () => {
    return (
      <button>
        Profile
      </button>
    );
  }
  
  function LogoutButton() {
    // Your logout function here
  
    return <button onClick={handleLogout}>Logout</button>;
  }

  export default ProfileButton