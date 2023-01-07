import { useEffect, useState } from 'react';

export default function useRefresh() {
  const [time, setTime] = useState(0);

  // auto refresh every second
  useEffect(() => {
    const interval = setInterval(
      () => setTime((prevTime) => prevTime + 1),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  });
  return time;
}
