import React, { useEffect, useState } from "react";

const CountdownClock = ({ startDate, d, h, m, s }) => {
  // Set the target date and time (7 days, 2 hours, 3 minutes, and 20 seconds from now)
  const targetDate = new Date(`${startDate}`);
  targetDate.setDate(targetDate.getDate() + d);
  targetDate.setHours(targetDate.getHours() + h);
  targetDate.setMinutes(targetDate.getMinutes() + m);
  targetDate.setSeconds(targetDate.getSeconds() + s);

  const initialTime = getTimeRemaining(targetDate);

  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        time.days === 0 &&
        time.hours === 0 &&
        time.minutes === 0 &&
        time.seconds === 0
      ) {
        clearInterval(interval);
      } else {
        updateTime();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const updateTime = () => {
    if (time.seconds > 0) {
      setTime((prevTime) => ({ ...prevTime, seconds: prevTime.seconds - 1 }));
    } else {
      if (time.minutes > 0) {
        setTime((prevTime) => ({
          ...prevTime,
          minutes: prevTime.minutes - 1,
          seconds: 59,
        }));
      } else {
        if (time.hours > 0) {
          setTime((prevTime) => ({
            ...prevTime,
            hours: prevTime.hours - 1,
            minutes: 59,
            seconds: 59,
          }));
        } else {
          if (time.days > 0) {
            setTime((prevTime) => ({
              ...prevTime,
              days: prevTime.days - 1,
              hours: 23,
              minutes: 59,
              seconds: 59,
            }));
          }
        }
      }
    }
  };

  function getTimeRemaining(targetTime) {
    const now = new Date().getTime();
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (timeDiff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeDiff % (60 * 1000)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <p className="w-full bg-neutral-800 text-white py-1.5 md:py-2 h-full px-2 text-center font-bold rounded">
          {time.days}d
        </p>
        <p className="w-full bg-neutral-800 text-white py-1.5 md:py-2 h-full px-2 text-center font-bold rounded">
          {time.hours}h
        </p>
        <p className="w-full bg-neutral-800 text-white py-1.5 md:py-2 h-full px-2 text-center font-bold rounded">
          {time.minutes}m
        </p>
        <p className="w-full bg-neutral-800 text-white py-1.5 md:py-2 h-full px-2 text-center font-bold rounded">
          {time.seconds}s
        </p>
      </div>
    </div>
  );
};

export default CountdownClock;
