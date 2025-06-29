import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema); 