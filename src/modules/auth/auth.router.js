const { login, register } = require('./auth.controller');

const router = require('express').Router();

router.post('/login', login)
router.post('/register', register)

module.exports = router;