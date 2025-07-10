function landing(req, res) {
  res.render('index', { title: 'landing Page' })
}

module.exports = { landing }
