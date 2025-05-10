import React, { useState, useEffect } from 'react';
import { getMotionEvents } from './api';

function Dashboard({ token }) {
  const [motionEvents, setMotionEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotionEvents = async () => {
      try {
        const res = await getMotionEvents(token);
        setMotionEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchMotionEvents();
  }, [token]);

  return (
    <div className="dashboard-container">
      <h2>Motion Sensor Dashboard</h2>
      {loading ? (
        <p>Loading motion events...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Detected</th>
            </tr>
          </thead>
          <tbody>
            {motionEvents.map((event) => (
              <tr key={event.id}>
                <td>{new Date(event.timestamp).toLocaleString()}</td>
                <td>{event.detected ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
