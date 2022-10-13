const router = require("express").Router();
const {isLoggedIn} = require("../middlewares/auth");
const {upload} = require("../middlewares/multer");

const {signup,login,logout} = require("../controllers/userController");
const {addJournal,downloadJournal,getAllJournals,viewJournal, deleteJournal} = require("../controllers/journalController");

// User Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

//Journal Operations
router.post("/addJournal", isLoggedIn, upload.single('journal'), addJournal);
router.get("/downloadJournal/:journal_id", downloadJournal);
router.get("/getAllJournals", getAllJournals);
router.get("/viewJournal/:journal_id", viewJournal);
router.delete("/deleteJournal/:journal_id", deleteJournal);

module.exports = {router};