import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';

const CountdownTimer = ({ initialDays }) => {
  const [daysRemaining, setDaysRemaining] = useState(initialDays);

  useEffect(() => {
    setDaysRemaining(initialDays); // Reset countdown whenever initialDays changes
  }, [initialDays]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 86400000); // Update every day

    return () => clearInterval(interval);
  }, []);

  return <span className="flex justify-center items-center gap-2">{daysRemaining} days</span>;
};
export default CountdownTimer;
