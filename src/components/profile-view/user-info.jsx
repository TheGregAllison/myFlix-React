import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function UserInfo() {
  const user = useSelector((state) => state.user);
  const userData = user.user;
  
  
  return (
    <>
      <h5>Username: {userData.Username}</h5>
      <h5>Email: {userData.Email}</h5>
    </>
  );
}

export default UserInfo;
