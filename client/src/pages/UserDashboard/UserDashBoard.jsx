import React, { useState, useEffect } from 'react'
import './userDashboard.css';
import { useHistory } from 'react-router-dom';
// import './userPage.css';
import Api from '../../Api/Api';
import LoginPage from '../Login/LoginPage';
import Button from '../../components/utils/Button/Button'
import CarpoolCollection from '../UserPage/Carpools/CarpoolList/CarpoolCollection'
import CreateCarpool from '../CreateCarpool/CreateCarpool'

function UserDashBoard() {


  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [view, setView] = useState("dashboard");
  const [showCreateCarpool, setShowCreateCarpool] = useState(false);
  const [carpools, setCarpools] = useState(null);

  const history = useHistory();

  useEffect(() => {
    try {
      console.log("InUseEffect");
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

          console.log("userData:", result?.data);
          setUserData(result.data);
          setCarpools(result.data.carpools);
          setLoading(false);
        } catch (error) {
          console.log(error)
          setErrMsg("Error occured please try again.");
          setLoading(false);
        }
      }
      getUser();

    } catch (error) {
      console.log("error:", error)
      // setErrMsg("Error occured please try again.");
      setLoading(false);
    }
  }, [])

  const onNewCarpool = () => {
    console.log("setShowCreateCarpool: ture")
    setShowCreateCarpool(true);
  }
  const onCreateCarpool = (carpool) => {
    setCarpools([...carpools, carpool]);
    onCloseCreateCarpool();
  }
  const onCloseCreateCarpool = () => {
    setShowCreateCarpool(false);
  }

  const onCarpoolClick = (carpoolId) => {
    console.log("onCarpoolClick", carpoolId);

  }

  return (
    <div className="userDashboard">
      <div className="topPlaceHolder"></div>
      <div className="mainContainer">
        <div className="sidePlaceHolder"></div>

        {errMsg ? <div>{errMsg}</div> :
          loading ? <div>Loading...</div> :
            !userData ? <LoginPage /> :
              <div className="mainContent">
                <CreateCarpool userToken={userToken} visible={showCreateCarpool} onCreateCarpool={onCreateCarpool} onCloseCreateCarpool={onCloseCreateCarpool} />
                <Button text="New Carpool" onClick={onNewCarpool} />
                <CarpoolCollection title="My Carpools" carpools={carpools} onCarpoolClick={onCarpoolClick} />
              </div>}
      </div>
    </div>
  )
}

export default UserDashBoard
