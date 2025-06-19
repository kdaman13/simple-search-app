import React, { useState } from 'react';
import getEnv from '../config/environment';
import './SearchBox.css';

const SearchBox = () => {
  const [id, setId] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const { API_URL } = getEnv();

  const handleSearch = async () => {
    if (!id) return;
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      setResponse(data);
      setId(''); // Clear input on success
    } catch (err) {
      setResponse({ error: 'Failed to fetch from API' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Booking Lookup</h2>
      <input
        type="text"
        value={id}
        placeholder="Enter Booking ID"
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p className="loading">Loading...</p>}

      {response && response.error && (
        <div className="error-msg">{response.error}</div>
      )}

      {response && !response.error && (
        <table className="response-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Ticket Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{response.requestId}</td>
              <td>{response.timestamp}</td>
              <td>{response.status}</td>
              <td>{response.ticketNumber}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchBox;
