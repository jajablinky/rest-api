'use strict';

const express = require('express');
// const { User } = require('./models');

// Construct a router instance.
const router = express.Router();

// Route that returns a list of users.
router.get('/users', (async (req, res) => {
  res.status(200);
}));

// Route that creates a new user.
router.post('/users', (async (req, res) => {
    res.status(201).location('/');
}));

module.exports = router;