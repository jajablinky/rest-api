const express = require("express");
const { User } = require("./models");
const { Course } = require("./models");
const { authenticateUser } = require("./middleware/auth-user");
const course = require("./models/course");
const user = require("./models/user");

// Construct a router instance.
const router = express.Router();

// Route that returns a list of users.
router.get("/users", authenticateUser, async (req, res) => {
  const user = req.currentUser;
  res.status(200).json({
    firstName: user.firstName,
    lastName: user.lastName,
  });
});

// Route that returns a list of courses
router.get("/courses", async (req, res) => {
  const courses = await Course.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "estimatedTime",
      "materialsNeeded",
    ],
    include: [
      {
        model: User,

        attributes: ["firstName", "lastName", "emailAddress"],
      },
    ],
  });
  res.status(200).json(courses);
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
router.post("/courses", authenticateUser, async (req, res) => {
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
router.put("/courses/:id", authenticateUser, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      if (course.userId === req.body.userId) {
        await course.update(req.body);

        res
          .status(204)
          .json({ message: `Course: ${course.title} is now updated. ` });
      } else {
        res
          .status(403)
          .json({ message: "That user provided is not permitted to update." });
      }
    } else {
      res
        .status(404)
        .json({ message: "That course could not be found, please try again." });
    }
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
router.delete("/courses/:id", authenticateUser, async (req, res) => {
  try {
    const currentCourse = await Course.findByPk(req.params.id);
    const currentUser = await User.findOne({
      where: { id: currentCourse.userId },
    });
    if (currentCourse) {
      if (currentCourse.userId === currentUser.id) {
        await currentCourse.destroy();
        res
          .status(204)
          .json({ message: `Course: ${currentCourse} has been deleted.` });
      } else {
        res
          .status(403)
          .json({ message: "That course provided is not permitted to update" });
      }
    } else {
      res
        .status(404)
        .json({ message: "That course could not be found, pleast try again." });
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error} while deleting course.` });
  }
});

module.exports = router;
