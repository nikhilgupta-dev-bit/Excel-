import File from '../models/File.js';

export const getDashboard = async (req, res) => {
  // Removed authentication check for now
  // if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authenticated' });
  const files = await File.find().sort({ uploadedAt: -1 });
  res.json({ files });
}; 