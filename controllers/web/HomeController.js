function home(req, res) {
  res.render('home/home', { title: 'Home Page' })
}

module.exports = { home }
