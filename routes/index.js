var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!res.locals.broken) {
    res.render('index', { title: 'Express' });
  } else {
  	res.status(500).send('Something broke!');
  }
});

module.exports = router;
