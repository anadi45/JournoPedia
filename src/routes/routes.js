const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");

const {signup, login, logout} = require("../controllers/userController");
const {createJournal, editJournal, getAllJournals, viewJournal, addEditors} = require("../controllers/journalController");
const {addIssue} = require("../controllers/issueController");

// User Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

//Journal Operations
router.post("/createJournal", isLoggedIn, createJournal);
router.patch("/editJournal/:journal_id", isLoggedIn, editJournal);
router.get("/getAllJournals", getAllJournals);
router.get("/viewJournal/:journal_id", viewJournal);
router.patch("/addEditors/:journal_id", isLoggedIn, addEditors);

//Issue Operations
router.post("/addIssue", isLoggedIn, upload.single('issue'), addIssue);

// --------- Change ----------
// router.get("/downloadJournal/:journal_id", downloadJournal);
// router.delete("/deleteJournal/:journal_id", deleteJournal);


module.exports = { router };
