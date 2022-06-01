var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Solarcraft', csrfToken: req.csrfToken(), sessionId: req.session.id });
});

router.get('/leaderboard', function(req, res, next) {
    res.render('leaderboard', { title: 'Solarcraft', csrfToken: req.csrfToken(), sessionId: req.session.id });
});

module.exports = router;