import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';

const CountdownTimer = ({ initialDays = 0 }) => {
  const normalizeDays = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  };

  const [daysRemaining, setDaysRemaining] = useState(normalizeDays(initialDays));

  useEffect(() => {
    setDaysRemaining(normalizeDays(initialDays)); // Reset countdown whenever initialDays changes
  }, [initialDays]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 86400000); // Update every day

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="flex justify-center items-center gap-2">
      {daysRemaining} days
    </span>
  );
};
export default CountdownTimer;
