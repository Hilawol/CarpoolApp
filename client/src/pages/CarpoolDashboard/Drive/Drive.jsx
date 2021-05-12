import React,{useState,useEffect} from 'react'
import './drive.css'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddCar from '../../AddCar/AddCar';

function Drive({ type, from, to, date,driverName }) {

  const [openAddCar,setOpenAddCar]=useState(false);
  const [cars,setCars]=useState([]);

useEffect(()=>{
console.log("cars:",cars);
},[cars])

  const onAddCarClick = () =>{
    setOpenAddCar(true);
  }

  const onCloseAddCar = () =>{
    setOpenAddCar(false);
  }

  const onCreateCar = (car)=>{
    console.log("create car:",car);
    setCars([...cars,car]);
    onCloseAddCar();
  }

  return (
    <div className="drive">
      <div className="driveHeader">
        <div className="destination">
          <DoubleArrowIcon className={type === "outbound" ? "outColor outArrow" : "inColor"} />
          <DoubleArrowIcon className={type === "outbound" ? "outColor outArrow" : "inColor"} />
          <DoubleArrowIcon className={type === "outbound" ? "outColor outArrow" : "inColor"} />
          <h3 >{`Driving to ${to}`}</h3>
        </div>
        <h3>{date}</h3>
        <div className="action">
          <button onClick={onAddCarClick} className={type === "outbound" ? "outBkg addCarBtn" : "inBkg addCarBtn"}>
            <AddCircleOutlineOutlinedIcon fontSize="large" sx={{ mr: 1 }} className="addIcon" />
            <span className="addCarText">Add Car</span>
          </button>
        </div>
      </div>
      <div className={type === "outbound" ? "outBkg carsSection" : "inBkg carsSection"}>
        {openAddCar? <AddCar visible={openAddCar} onClose={onCloseAddCar} onAdd={onCreateCar} driverName={driverName}/>:null}
      </div>
    </div >
  )
}

export default Drive
