import { useState, useEffect } from 'react';

export interface CountdownResult {
  isValid: boolean;
  isPast: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Calculates countdown remaining until target date.
 * If targetDateIso contains the placeholder "[DATE_ISO]" or is not a valid date,
 * gracefully flags isValid: false so the UI can hide the countdown smoothly.
 */
export function useCountdown(targetDateIso: string): CountdownResult {
  const isDateValid = Boolean(
    targetDateIso &&
    !targetDateIso.includes('[DATE_ISO]') &&
    !isNaN(Date.parse(targetDateIso))
  );

  const calculateRemaining = (): CountdownResult => {
    if (!isDateValid) {
      return { isValid: false, isPast: false, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const target = new Date(targetDateIso).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { isValid: true, isPast: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      isValid: true,
      isPast: false,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownResult>(calculateRemaining);

  useEffect(() => {
    if (!isDateValid) return;

    // Tick every second
    const interval = setInterval(() => {
      setTimeLeft(calculateRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateIso, isDateValid]);

  return timeLeft;
}
