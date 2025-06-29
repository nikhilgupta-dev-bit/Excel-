import express from 'express';
import passport from 'passport';
import { login, callback, logout, getCurrentUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }), login);
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), callback);
router.get('/logout', logout);
router.get('/me', getCurrentUser);

export default router; 