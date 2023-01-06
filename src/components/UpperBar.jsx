import axios from 'axios'
import React, { useRef, useState } from 'react'

const UpperBar = ({ setSelectedCity }) => {
  const [result, setResult] = useState();
  const searchBar = useRef();

  const getResults = (url) => {
      axios.get(url)
        .then(res => setResult(res.data));
  }

  // Request for getting the searched city
  const onSearch = (e) => {
    getResults(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiZXVkeXgiLCJhIjoiY2xhemd5c2M4MHV4ajN2cnMzZGtxdmMxMyJ9.no-an8cBtT0Ai1FmyigQDw`);
  }

  const onSetTextValue = (city) => {
    setSelectedCity(city);
    searchBar.current.value = "";
    setResult({});
  }

  return (
    <>
      <h1 className='logo upper-logo'>
          Weather App
      </h1>
    <div className='upperBar'>
    <div className='user-container'>
        <img className='user' src='icons/user.svg' alt='user image' />
        <h1 className='user-name'>User Name</h1>
    </div>

    <form>
        <div className='field'>
          <div style={{width: "20%", height: "100%", display: "flex", justifyContent: "center", alingItems: "center", float: "left"}}>
            <img className='search-icon' src='icons/search-icon.svg' />
          </div>
          <input type='text' onChange={onSearch} ref={searchBar} />
          {result != undefined ? 
          result.features?.length ? 
          <div className='results' >
            {
              result.features.map(x => 
              <button type="submit" key={x.id} className="result-item" onClick={(e) => {e.preventDefault();
              onSetTextValue(x);}} >
                  <hr />
                  <h5 style={{margin: "7px 0px"}}>{x.text}</h5>
                  <h6 >{x.place_name}</h6>
              </button>
              )
            }
          </div>
          :
          null
          :
          null
          }
        </div>
    </form>
      
      <div className='logo-container'>
        <h1 className='logo side-logo'>
            Weather App
        </h1>
      </div>
    </div>
    </>
  )
}

export default UpperBar
