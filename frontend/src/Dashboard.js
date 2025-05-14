import React, { useState, useEffect } from 'react';
import { getMotionEvents } from './api';
import './Dashboard.css';

function Dashboard({ token }) {
  const [motionEvents, setMotionEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotionEvents = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const res = await getMotionEvents(token);
        setMotionEvents(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMotionEvents(); // Initial fetch

    const intervalId = setInterval(fetchMotionEvents, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [token]); // Trigger re-run when 'token' changes

  return (
    <div className="ocean-dashboard">
      <h2 className="dashboard-heading">Security Alarm Motion Sensor</h2>
      {loading ? (
        <p className="dashboard-loading">Retrieving motion data...</p>
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
              {motionEvents.map((event, index) => (
                <tr key={index}>
                  <td>{new Date(event.timestamp).toLocaleString()}</td>
                  <td className={event.motion ? 'detected' : 'not-detected'}>
                    {event.motion ? 'Yes' : 'No'}
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
