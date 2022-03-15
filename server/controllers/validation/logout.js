const logout = (req, res) => {
  res.clearCookie('token').end();
};

module.exports = logout;
