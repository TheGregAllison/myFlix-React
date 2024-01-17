import React from 'react';

function UserInfo({ username, email }) {
  return (
    <>
      <h5>Username: {username}</h5>
      <h5>Email: {email}</h5>
    </>
  );
}

export default UserInfo;
