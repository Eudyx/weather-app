export const useWeatherIcon = () => {
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
    return <img className="weather-icon" src={`icons/weather-icons/${res}.svg`} />
  }

    return [setWeatherIcon];
}