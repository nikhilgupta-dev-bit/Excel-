import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('File', FileSchema); 