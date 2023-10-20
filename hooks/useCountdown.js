import { useState, useEffect } from 'react';

const useCountdown = (endDate) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {};
    let isOverdue = false;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      isOverdue = true;
    }

    return { timeLeft, isOverdue };
  };

  const [state, setState] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setState(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return state; // Return both timeLeft and isOverdue
};


export default useCountdown;
