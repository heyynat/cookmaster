const express = require('express');
const authAdmin = require('../auth/authAdmin0');
const Users = require('../controllers/users');

const router = express.Router({ mergeParams: true });

router.post('/users', Users.create);
router.post('/users/admin', authAdmin, Users.createAdm);
router.post('/login', Users.login);

module.exports = router;
