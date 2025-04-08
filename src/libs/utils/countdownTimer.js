import { useState, useEffect } from "react";

const CountdownTimer = ({ initialDays }) => {
  const [daysRemaining, setDaysRemaining] = useState(initialDays);

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 86400000); // Update every day

    return () => clearInterval(interval);
  }, []);

  return <span>{daysRemaining} days</span>;
};

export default CountdownTimer;