import React, { useState, useEffect } from 'react';
import { loginUser } from "../api";
import { useHistory } from 'react-router-dom';
import '../style/Login.css';

const Login = (props) => {
  const [hasTriggeredError, setHasTriggeredError ] = useState(false);
  const {isLoggedIn, setIsLoggedIn, username, setUsername, password, setPassword} = props;
  let history = useHistory();

  const handleLogin = async (event) => {
    console.log("Logging in...");
    event.preventDefault();
    setUsername("");
    setPassword("");

    const userObject = {
      username: username,
      password: password,
    };


  const didLoginWork = await loginUser(userObject);
  if(didLoginWork === false){
    setHasTriggeredError(true);
  } else{
    setIsLoggedIn(didLoginWork);
    history.push("/product")
  }

  };

  const handleUserChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);

  };

  useEffect(() => {
    setIsLoggedIn(!localStorage.getItem("userToken"));
  }, []);

    // create a landing page for if login was  successful

    return (
      <>
      <div id="login" className="loginStyle">
        <form>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={handleUserChange}
          ></input>

          <label>Password: </label>
          <input
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={handlePasswordChange}
          ></input>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          <button type="submit" onClick={handleLogOut}>
            Log Out
          </button>
        </form>
      </div>
    </>
  );
};

export default Login