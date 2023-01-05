import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UpperBar from './UpperBar'
import Weather from './Weather'

const Box = () => {
    const [ weather, setWeather ] = useState();
    const [currentLocation, setCurrentLocation] = useState();
    const [selectedCity, setSelectedCity] = useState({center: []});

    // Tokens
    const mapBox_token = 'pk.eyJ1IjoiZXVkeXgiLCJhIjoiY2xhemd5c2M4MHV4ajN2cnMzZGtxdmMxMyJ9.no-an8cBtT0Ai1FmyigQDw';
    const ow_token = '6e293401ee12e1cb0f99e77a2c253b44';
    let url = '';

    // Setting the lat and lon
    url = selectedCity.center.length != 0 ? 
    `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.center[1]}&lon=${selectedCity.center[0]}&units=metric&appid=${ow_token}`
      :
      currentLocation != undefined ?
    `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.center[1]}&lon=${currentLocation.center[0]}&units=metric&appid=${ow_token}`
      : "" ;

    // Requests to the api's
    const getCurrentLocation = (lat, lon) => {
      axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?
        types=place%2Cpostcode%2Caddress&limit=1&access_token=${mapBox_token}`)
          .then(res => setCurrentLocation(res.data.features[0]));
    }

    const getTheWeather = () => {
        axios.get(url)
            .then(res => {setWeather(res.data) 
              console.log(res.data)});
    }

    //GEOLOCATION

    //geolocation options
    const options = {
      enableaHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    }

    // In case of geolocation success
    const success = (pos) => {
      const crd = pos.coords;
      getCurrentLocation(crd.latitude, crd.longitude);
      
      console.log(selectedCity);
    }
    
    // Geolocation error
    const error = (err) => {
      console.log(`ERROR(${err.code}): ${err.message}`);
    }

    // Geolocation call
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(success, error, options);
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
