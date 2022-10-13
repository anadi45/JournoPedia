const router = require("express").Router();
const {isLoggedIn} = require("../middlewares/auth");
const {upload} = require("../middlewares/multer");

const {signup,login,logout} = require("../controllers/userController");
const {addJournal,getJournal} = require("../controllers/journalController");

// User Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

//Journal Operations
router.post("/addJournal",isLoggedIn, upload.single('journal'), addJournal);
router.post("/getJournal", getJournal);

module.exports = {router};