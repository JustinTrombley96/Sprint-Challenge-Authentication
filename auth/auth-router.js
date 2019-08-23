const router = require('express').Router();
const bcrypt = require('bcryptjs');
const secrets = require('../config/secrets');
const Users = require('../api/users-model.js');

const jwt = require('jsonwebtoken');


router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
