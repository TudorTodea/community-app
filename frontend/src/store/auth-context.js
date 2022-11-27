
import React, { useState } from 'react';

const AuthContext = React.createContext({
  userId: '',
  username: '',
  avatarImage: '',
  login: () => { },
  logout: () => { },
});


export const AuthContextProvider = (props) => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [avatarImage, setAvatarImage] = useState('');

  const logoutHandler = () => {

    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    localStorage.removeItem('avatarImage');
    setUsername('')
    setUserId('');
    setAvatarImage('');

  };
  const loginHandler = (username, id, avatarImage) => {

    setUsername(username);
    setUserId(id);
    setAvatarImage(avatarImage)
    localStorage.setItem('userid', id);
    localStorage.setItem('username', username);
    localStorage.setItem('avatarImage', avatarImage);
  };

  const contextValue = {
    username: username,
    userId: userId,
    avatarImage,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
