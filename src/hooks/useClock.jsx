import { useState } from "react";

export const useClock = () => {
    const [hour, setHour] = useState();

      // This function returns your device's current hour
  const clock = () => {
    const date = new Date();
    let h = date.getHours() + ':';
    let m = date.getMinutes() <= '9' ? '0' + date.getMinutes() : date.getMinutes();
    
    return h + m;
  }

  const  interval = () => {
      setInterval(() => {
        setHour(clock());
      }, 1000);
  }

    return [hour, interval];
}