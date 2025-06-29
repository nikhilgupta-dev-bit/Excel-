import React, { useState } from 'react';
import { uploadExcelFile } from '../services/api';
// This component allows users to upload an Excel file and displays the uploaded data or any errors.

const Upload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setData(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError('Please select a file');
    setLoading(true);
    try {
      const res = await uploadExcelFile(file);
      setData(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📊 Upload Excel File</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" disabled={!file || loading} style={styles.button}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        {data && (
          <div style={styles.result}>
            <h4>✅ Uploaded Data:</h4>
            <pre style={styles.pre}>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f3f4f6',
    padding: '2rem',
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#111827',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.6rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
  },
  button: {
    padding: '0.6rem',
    backgroundColor: '#3b82f6',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  error: {
    color: '#ef4444',
    marginTop: '1rem',
    fontWeight: '500',
  },
  result: {
    marginTop: '2rem',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '1rem',
    fontSize: '0.9rem',
    color: '#1f2937',
  },
  pre: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
};

export default Upload;
