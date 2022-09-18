const router = require("express").Router();
const {isLoggedIn} = require("../middlewares/auth");
const {signup,login,logout} = require("../controllers/userController");

// User Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = {router};