import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UpperBar from './UpperBar'
import Weather from './Weather'
import { useCurrentLocation } from '../hooks/useCurrentLocation';

const Box = () => {
    const [ weather, setWeather ] = useState();
    const [selectedCity, setSelectedCity] = useState({center: []});
    const [currentLocation, getLocation] = useCurrentLocation();

    // Tokens
    const ow_token = '6e293401ee12e1cb0f99e77a2c253b44';
    let url = '';

    // Setting the lat and lon
    url = selectedCity.center.length != 0 ? 
    `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.center[1]}&lon=${selectedCity.center[0]}&units=metric&appid=${ow_token}`
      :
      currentLocation != undefined ?
    `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.center[1]}&lon=${currentLocation.center[0]}&units=metric&appid=${ow_token}`
      : "" ;

      const getTheWeather = () => {
        axios.get(url)
            .then(res => {setWeather(res.data) 
              console.log(res.data)});
      }

    useEffect(() =>{
      getLocation();
    }, []);

    useEffect(() => {
      // Saving in the state the current location
      currentLocation != undefined ?
      setSelectedCity(currentLocation) : null;
    }, [currentLocation]);

    useEffect(() => {
      // Getting the weather
      url !== "" ?
      getTheWeather() : null;
    }, [selectedCity]);



  return (
    <div className='box'>
      <UpperBar setSelectedCity={setSelectedCity} />
      <Weather weather={weather} selectedCity={selectedCity} />
    </div>
  )
}

export default Box
