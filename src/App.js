import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
function App() {
  const [change,setchange] = useState(false);
  const img_styles={
    height:"150px",
    width:"150px"
  }
  const [des,setDes] = useState("description")
  const [iconcode,setIconcode] = useState(null);
  const [city,setCity] = useState({
    city_name:'hyderabad',
    units:"metric"
  });
  const [temp,settemp]= useState(null);
  useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.city_name}&units=${city.units}&appid=21a1390d77f44795cdadec9b70430767`)
    .then((data)=>{
      setDes(data.data.weather[0].description)
      setIconcode(data.data.weather[0].icon)
      settemp(data.data.main.temp);
    }).catch((err)=>{
      console.log(err);
    });
  },[city]);
  const handlechange = (event)=>{
    const value = event.target.value;
    const name = event.target.name;
    console.log(value);
    if(name==="city")
    {
      setCity((prev)=>{
        return{
          city_name:value,
          units:prev.units
        }
      })
    }
    else{
      if(value=="metric")
      {
        setchange(false);
      }
      else{
        setchange(true);
      }
      setCity((prev)=>{
        return{
          city_name:prev.city_name,
          units:value
        }
      })
    }
  }
  return (
    <div className="app">
      <div className="flexer">
        <h1 className="heading" >Weather App</h1>
      <div className="container">
        <div className="left">
          <div className="top">
              <h1>{temp} {change? <span>&#x2109;</span>:<span>&#8451;</span> } </h1>
          </div>
          <div className="bottom">
            <div className="bottom_left">
              <input defaultValue="hyderabad" name="city" className="icon_image" type="text" onChange={handlechange} placeholder="cityname"/>
            </div>
            <div className="bottom_right">
                <select onChange={handlechange} name="units" >
                  <option name="units" value="metric">Celcius</option>
                  <option name="units" value="imperial">Fahrenheit</option>
                </select>
            </div>
          </div>
        </div>
        <div className="right">
            <div className="top">
                <img style={img_styles} src={`http://openweathermap.org/img/w/${iconcode}.png`} alt="" />
            </div>
            <div className="bottom">
              <h1>{des}</h1>
            </div>
        </div>
      </div>
      </div>
      <div className="devteam">
          <h1>Devteam</h1>
          <div className="devteam_center">
            <h2 className="devmembername">Siddu</h2>
            <h2 className="devmembername">Manikanta</h2>
            <h2 className="devmembername">Adi lakshmi</h2>
          </div>
      </div>
    </div>
  );
}
export default App;
