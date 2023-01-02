import { useState, useEffect } from 'react';

export default function useRefresh() {
  const [time, setTime] = useState(Date.now());

  // auto refresh every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  });
  return [time, setTime];
}
