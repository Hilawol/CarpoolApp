import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Sidebar from './SideBar/Sidebar';
import TopBar from './TopBar/TopBar';
import Main from './Main/Main';
import './userPage.css';
import Api from '../../Api/Api';
import LoginPage from '../Login/LoginPage';


function UserPage() {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const history = useHistory();

  useEffect(() => {
    try {
      const token = sessionStorage.getItem('token');
      console.log("token:", token);
      let parsedToken;
      if (token) {
        parsedToken = JSON.parse(token);
        setUserToken(parsedToken);
      }
      else {
        throw new Error();
      }

      const getUser = async () => {
        try {
          const result = await Api.get('/users/me', { headers: { 'Authorization': `Bearer ${parsedToken}` } });
          setUserData(result.data);
          setLoading(false);
        } catch (error) {
          console.log(error)
          setErrMsg("Error occured please try again.");
          setLoading(false);
        }
      }
      getUser();

    } catch (error) {
      console.log("47:", error)
      // setErrMsg("Error occured please try again.");
      setLoading(false);
    }

  }, [])

  const onLogout = async () => {
    console.log("logout");
    try {
      console.log(userToken);
      const result = await Api.post('/users/logout', {}, { headers: { 'Authorization': `Bearer ${userToken}` } });
      sessionStorage.removeItem('token');
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    errMsg ? <div>{errMsg}</div> :
      loading ? <div>Loading...</div> :
        !userData ?
          <LoginPage /> :
          <div className="userPage">
            <TopBar onLogoutClick={onLogout} />
            <h1>Wellcome {userData.firstName}</h1>
            <section className="mainSection">
              <Sidebar />
              <Main />
            </section>
          </div>
  )
}

export default UserPage
