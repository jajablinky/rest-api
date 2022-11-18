"use strict";

const express = require("express");
const { User } = require("./models");
const { Course } = require("./models");

// Construct a router instance.
const router = express.Router();

// Route that returns a list of users.
router.get("/users", async (req, res) => {
  res.status(200);
  res.end();
});

// Route that returns a list of courses
router.get("/courses", async (req, res) => {
  res.status(200);
  res.end();
});

// Route that returns a course by id
router.get("/courses/:id", async (req, res) => {
  res.status(200);
  res.end();
});

// Route that creates a new user.
router.post("/users", async (req, res) => {
  try {
    await User.create(req.body);
    res
      .location("/")
      .status(201)
      .json({ message: "User successfully created" });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
});

// Route that creates a new course.
router.post("/courses", async (req, res) => {
  try {
    await Course.create(req.body);
    const { id } = req.body;
    res
      .location(`/courses/${id}`)
      .status(201)
      .json({ message: "Course successfully created" });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
});

// Route that updates an existing course.
router.put("/courses/:id", async (req, res) => {
  try {
    await Course.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(204);
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
});

// Route that deletes an existing course.
router.delete("/courses/:id", async (req, res) => {
  await Course.destroy({ where: { id: req.params.id } });
  res.status(204);
});

module.exports = router;
