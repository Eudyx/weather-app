import { useEffect, useState } from "react"

const Weather = ({ weather, selectedCity }) => {
  // Date objects for the clock
  const initialHour = new Date();
  const minutes = initialHour.getMinutes() <= '9' ? '0' + initialHour.getMinutes() : initialHour.getMinutes();
  
  const [side, setSide] = useState(true);
  const [hour, setHour] = useState(initialHour.getHours() + ':' + minutes);

  // Array of days
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Moving the switch
  const floatSwitch = () => {
    return !side ? {transform: "translate(0, 0)"} : {transform: "translate(21px, 0)"};
  }

  // This function returns your device's current hour
  const clock = () => {
    const date = new Date();
    let h = date.getHours() + ':';
    let m = date.getMinutes() <= '9' ? '0' + date.getMinutes() : date.getMinutes();
    
    return h + m;
  }

  // This function returns an image with the current icon
  const setWeatherIcon = (icon) => {
    let res = 'nothing';
    let pattern1 = /n/;
    let pattern2 = /02/;
    let pattern3 = /10/;
    let pattern4 = /01/;

    if(pattern2.test(icon) && pattern3.test(icon) && pattern4.test(icon)){
      if(pattern1.test(icon) && icon != 'nothing') {
        res = icon.replace("n", "d");
      }
    } else {
      res = icon;
    }
     console.log(res);
    return <img className="weather-icon" src={`icons/weather-icons/${res}.svg`} />
  }

  useEffect(() => {
    // setInterval for the clock
    setInterval(() => {
      setHour(clock());
    }, 1000)
  }, []);

  
  return (
    <div className='weather-container'>
      {/* Header */}
      <div className='header'>
        <h2 className='day' >{days[initialHour.getDay()]}</h2>
        <h2 className="city" >{selectedCity.text}</h2>
        <h2 className='place_name' >{selectedCity.place_name}</h2>
        <div className='mode-container'>
        <img src="icons/moon.svg" style={{width: "18px"}} />
          <div  className='mode-switch' onClick={() => {
            setSide(!side)}
          } >
            <div className='ball' style={floatSwitch()} ></div>
          </div>
          <img src="icons/switch-sun.svg" style={{width: "22px"}} />
        </div>
      </div>
      {/* Header */}
      
      {/* Weather information */}
        <div className='info'>
          {/* Weather */}
          
          <div className='weather weather-box'>
              <h1>Weather</h1>
              <h2>How’s the weather?</h2>
              <div className='icon-container'>
                {/* <img className="weather-icon" src="icons/weather-icons/10d.svg" /> */}
                {weather != undefined ? 
                  setWeatherIcon(weather.weather[0].icon) 
                  : 
                  setWeatherIcon('nothing')
                }
                {/* {weather != undefined ? 
                  console.log(weather.weather[0].icon) 
                  : 
                  console.log('nothing')
                } */}
              </div>
              {weather != undefined ? 
              <>
              {/* Temp */}
                <p className="weather-temp" >{Number(weather.main.temp).toFixed(1)}°C</p>
                <div className="f-container" >{
                  <h3>{
                    // Converting from °C to °F
                    ((Number(weather.main.temp) * (9/5) + 32)).toFixed(1)
                  }°F</h3>}
                </div> 
              </>
              : null}
              <div className="today" >Today</div>
          </div>
          {/* Weather */}
          <div className="mid-container" >
            {/* Humidity */}
            <div className="humidity weather-box">
              <h1>Humidity</h1>
              <br/>
              {weather != undefined ? 
                  <h2>{weather.main.humidity}%</h2>
                  : 
                  null
                }
              <img className="humidity-icon" src="icons/humidity.svg" />
            </div>
            {/* Description */}
            <div className="description weather-box">
              {weather != undefined ? 
                <div>
                  <h1>{weather.weather[0].main}</h1>
                  <div className="subtitle-description">
                    <h3>Description</h3>
                  </div>
                  <h2>{weather.weather[0].description}</h2>
                </div>
                : 
                null
              }
              <div className="clouds-circle" >
              {weather != undefined ? 
                  setWeatherIcon(weather.weather[0].icon) 
                  : 
                  setWeatherIcon('nothing')
                }
              </div>
            </div>
          </div>
          {/* Wind */}
          <div className="right-container" >
            <div className="clock weather-box">
              <h2>{hour}</h2>
            </div>
            <div className="wind weather-box">
              <br/>
                <h1>Wind</h1>
                {weather != undefined ? 
                <div className="wind-info">
                  <div className="items-value" >
                    <table style={{width: "100%"}}>
                      <tbody style={{textAlign: "left", width: "100%"}} >
                        <tr>
                          <td style={{
                            paddingTop: "30px",
                            color: "#ffff",
                            paddingLeft: "18px"
                          }}>Speed</td>
                          <td style={{paddingTop: "30px"}}>{Number(weather.wind.speed).toFixed(1)}<span style={{display: "contents", fontSize: "14px"}} > km</span></td>
                        </tr>
                        <tr>
                          <td style={{
                            paddingTop: "5px",
                            color: "#ffff",
                            paddingLeft: "18px"
                          }}>Degrees</td>
                          <td style={{paddingTop: "15px"}}>{Number(weather.wind.deg)}°</td>
                        </tr>                        
                        <tr>
                          <td style={{
                              paddingTop: "5px",
                              color: "#ffff",
                              paddingLeft: "18px"
                          }}>Gust</td>
                          <td style={{paddingTop: "15px"}}>{Number(weather.wind.gust).toFixed(1)}<span style={{display: "contents", fontSize: "14px"}} > km</span></td>
                        </tr>
                      </tbody>
                    </table>
                    
                  </div>
                </div>
                : 
                null
              }
            </div>
          </div>
        </div>
        {/* <div className="by-hour">
        </div> */}
    </div>
  )
}

export default Weather
