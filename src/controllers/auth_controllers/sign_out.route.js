const handleSignOut = (req, res) => {
  req.logOut((err) => {
    if (err) return res.status(500).json({ maessage: "Sign out failed" });
    req.session.destroy(() => res.json({ message: "Logged out" }));
  });
};

module.exports = handleSignOut;
