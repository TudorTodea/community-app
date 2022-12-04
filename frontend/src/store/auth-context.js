
import React, { useState } from 'react';

const AuthContext = React.createContext({
  userId: '',
  username: '',
  avatarImage: '',
  isLoggedIn: false,
  login: () => { },
  logout: () => { },
});


export const AuthContextProvider = (props) => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [avatarImage, setAvatarImage] = useState('');
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const logoutHandler = () => {

    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    localStorage.removeItem('avatarImage');
    localStorage.removeItem('token');
    setToken(null);
    setUsername('')
    setUserId('');
    setAvatarImage('');

  };
  const loginHandler = (username, id, avatarImage, token) => {
    setToken(token);
    setUsername(username);
    setUserId(id);
    setAvatarImage(avatarImage)
    localStorage.setItem('userid', id);
    localStorage.setItem('username', username);
    localStorage.setItem('avatarImage', avatarImage);
    localStorage.setItem('token', token);
  };


  const contextValue = {
    username: username,
    userId: userId,
    avatarImage,
    login: loginHandler,
    logout: logoutHandler,
    isLoggedIn: userIsLoggedIn,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
