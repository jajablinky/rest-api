'use strict';

const express = require('express');
const { User } = require('./models');
const { Course } = require('./models');

// Construct a router instance.
const router = express.Router();

// Route that returns a list of users.
router.get('/users', (async (req, res) => {
  res.status(200);
  res.end();
}));

// Route that returns a list of courses
router.get('/courses', (async (req, res) => {
  res.status(200);
  res.end();
}));

// Route that returns a course by id
router.get('/courses/:id', (async (req, res) => {
  res.status(200);
  res.end();
}));

// Route that creates a new user.
router.post('/users', async (req, res) => {
    await User.create(req.body);
    res.status(201).location('/');
    res.end();
});

// Route that creates a new course.
router.post('/courses', (async (req, res) => {
  res.status(201).location('/');
  res.end();
}));

// Route that updates an existing course.
router.post('/courses/:id', (async (req, res) => {
  res.status(204);
  res.end();
}));

// Route that deletes an existing course.
router.post('/courses/:id', (async (req, res) => {
  res.status(204);
  res.end();
}));

module.exports = router;