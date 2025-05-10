import React, { useEffect, useState } from 'react';
import { getMotionEvents } from './api';

export default function MotionLog({ token }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMotionEvents(token);
      setEvents(res.data);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);  // refresh every 5 sec
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div>
      <h2>Motion Events</h2>
      <ul>
        {events.map((e, i) => (
          <li key={i}>{new Date(e.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}
