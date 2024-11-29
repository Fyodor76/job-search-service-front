import { useState, useEffect } from "react";

const useCountdown = (initialSeconds: number) => {
  const [remainingTime, setRemainingTime] = useState(initialSeconds);

  useEffect(() => {
    if (remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  return remainingTime;
};

export default useCountdown;
