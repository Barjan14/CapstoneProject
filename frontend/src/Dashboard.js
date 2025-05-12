import React, { useState, useEffect } from 'react';
import { getMotionEvents } from './api';
import './Dashboard.css';

function Dashboard({ token }) {
  const [motionEvents, setMotionEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotionEvents = async () => {
      try {
        const res = await getMotionEvents(token);
        setMotionEvents(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMotionEvents();
  }, [token]);

  return (
    <div className="ocean-dashboard">
      <h2 className="dashboard-heading"> Security Alarm Motion Sensor</h2>
      {loading ? (
        <p className="dashboard-loading">Retrieving wave data...</p>
      ) : (
        <div className="dashboard-table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Motion Detected</th>
              </tr>
            </thead>
            <tbody>
              {motionEvents.map((event) => (
                <tr key={event.id}>
                  <td>{new Date(event.timestamp).toLocaleString()}</td>
                  <td className={event.detected ? 'detected' : 'not-detected'}>
                    {event.detected ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
