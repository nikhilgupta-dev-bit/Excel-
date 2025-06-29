// Placeholder for API service functions (e.g., fetch dashboard data, upload files)
import axios from 'axios';

export const fetchDashboardData = async () => {
  const res = await axios.get('http://localhost:5000/api/dashboard');
  return res.data;
};

export const uploadExcelFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post('http://localhost:5000/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};