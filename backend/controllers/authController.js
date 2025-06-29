export const login = (req, res) => {
  res.send('Redirecting to Google...');
};

export const callback = (req, res) => {
  // Redirect to frontend dashboard after successful login
  res.redirect('http://localhost:5173/dashboard');
};

export const logout = (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5173/');
  });
};

export const getCurrentUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
}; 