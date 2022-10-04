const router = require("express").Router();
const {isLoggedIn} = require("../middlewares/auth");
const {upload} = require("../middlewares/multer");

const {signup,login,logout} = require("../controllers/userController");
const {addJournal} = require("../controllers/journalController");

// User Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

//Journal Operations
router.post("/addJournal",upload.single('journal'), isLoggedIn, addJournal);

module.exports = {router};