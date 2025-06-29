import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { auth } from '../firebase';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = await auth.currentUser.getIdToken();
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFiles(res.data.files);
      } catch (err) {
        setError('Not authenticated or failed to fetch dashboard data');
      }
    };
    fetchFiles();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {files.map(file => (
          <li key={file._id}>{file.filename} (uploaded {new Date(file.uploadedAt).toLocaleString()})</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard; 