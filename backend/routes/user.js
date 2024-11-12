const express = require("express");
const requireAdmin = require('../middleware/requireAdmin')

// controller functions
const {signupUser, loginUser, getUsers} = require('../controllers/userControllers')

const router = express.Router();

// login
router.post("/login", loginUser);

// signup
router.post("/signup", signupUser);

// changes here

// middleware that checks if the user is an admin or not (again) for good security (may delete this later)
router.use(requireAdmin)

// route to get all the users signed in
router.get("/users", getUsers)

module.exports = router;
