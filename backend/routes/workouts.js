const express = require("express");
const {
  addWorkout,
  getWorkouts,
  getWorkout,
  delWorkout,
  updateWorkout,
  getWorkoutsofanUser
} = require("../controllers/workoutControllers");
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// we mention this middleware after instantiating the router and before the routes so that before firing any route it first runs the middleware function and then the route handler.
router.use(requireAuth)

// GET all the wokrouts
router.get("/", getWorkouts);

// GET a single workout
// router.get("/:id", getWorkout);

// GET workouts of a particular user
router.get("/:id", getWorkoutsofanUser)

// Add a new workout
router.post("/", addWorkout);

// DELETE a workout
router.delete("/:id", delWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
