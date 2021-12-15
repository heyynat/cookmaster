const express = require('express');
const Users = require('../controllers/users');

const router = express.Router({ mergeParams: true });

router.post('/users', Users.create);
router.post('/login', Users.login);

module.exports = router;
