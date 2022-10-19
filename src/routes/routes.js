const router = require("express").Router();
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const { upload, imageUpload } = require("../middlewares/multer");

const { signup, login, logout } = require("../controllers/userController");
const {
  createJournal,
  editJournal,
  getAllJournals,
  viewJournal,
  addEditors,
} = require("../controllers/journalController");
const {
  addIssue,
  downloadIssue,
  deleteIssue,
} = require("../controllers/issueController");

// User Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

//Journal Operations
router.post("/createJournal", isAdmin, imageUpload.single("image"), createJournal);
router.patch("/editJournal/:journal_id", isLoggedIn, editJournal);
router.get("/getAllJournals", getAllJournals);
router.get("/viewJournal/:journal_id", viewJournal);
router.patch("/addEditors/:journal_id", isLoggedIn, addEditors);

//Issue Operations
router.post("/addIssue", isLoggedIn, upload.single("issue"), addIssue);
router.get("/downloadIssue/:issue_id", downloadIssue);
router.delete("/deleteIssue/:issue_id", isLoggedIn, deleteIssue);

// --------- Change ----------
// router.get("/downloadJournal/:journal_id", downloadJournal);
// router.delete("/deleteJournal/:journal_id", deleteJournal);

module.exports = { router };
