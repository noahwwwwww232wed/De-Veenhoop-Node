function home(req, res) {
  res.send("Welcome to the homepage!");
 // res.sendFile(path.join(__dirname, '../views/admin.html'));
}
module.exports = { home };