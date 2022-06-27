var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Dokdo', csrfToken: req.csrfToken(), sessionId: req.session.id });
});

router.get('/cmc-request', function(req, res, next) {
    res.render('cmc-request', { title: 'Dokdo', csrfToken: req.csrfToken(), sessionId: req.session.id });
});

module.exports = router;