import { useState } from "react";
import axios from "axios";

export const useCurrentLocation = () => {
    const [currentLocation, setCurrentLocation] = useState();
    const mapBox_token = 'pk.eyJ1IjoiZXVkeXgiLCJhIjoiY2xhemd5c2M4MHV4ajN2cnMzZGtxdmMxMyJ9.no-an8cBtT0Ai1FmyigQDw';
        // Requests to the api's
        const getCurrentLocation = (lat, lon) => {
            axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?
              types=place%2Cpostcode%2Caddress&limit=1&access_token=${mapBox_token}`)
                .then(res => setCurrentLocation(res.data.features[0]));
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
          }
          
          // Geolocation error
          const error = (err) => {
            console.log(`ERROR(${err.code}): ${err.message}`);
          }
      
          // Geolocation call
          const getLocation = () => {
            navigator.geolocation.getCurrentPosition(success, error, options);
          }

    return [currentLocation, getLocation];
}