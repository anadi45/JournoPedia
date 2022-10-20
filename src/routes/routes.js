const router = require("express").Router();
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const { articleUpload, imageUpload } = require("../middlewares/multer");

const { signup, login, logout, userDetails } = require("../controllers/userController");
const {
  createJournal,
  editJournal,
  getAllJournals,
  getAllJournalIds,
  viewJournal,
  addEditors,
  changeAuthor,
  deleteJournal
} = require("../controllers/journalController");
const {
  addArticle,
  downloadArticle,
  deleteArticle,
} = require("../controllers/articleController");

// User Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/userDetails/:id", userDetails);

//Journal Operations
router.post("/createJournal", isAdmin, imageUpload.single("image"), createJournal);
router.patch("/editJournal/:journal_id", isLoggedIn, editJournal);
router.get("/getAllJournals", getAllJournals);
router.get("/getAllJournalIds", getAllJournalIds);
router.get("/viewJournal/:journal_id", viewJournal);
router.patch("/addEditors/:journal_id", isLoggedIn, addEditors);
router.patch("/changeAuthor/:journal_id", isAdmin, changeAuthor);
router.delete("/deleteJournal/:journal_id", isAdmin, deleteJournal);

//Article Operations
router.post("/addArticle", isLoggedIn, articleUpload.single("article"), addArticle);
router.get("/downloadArticle/:issue_id", downloadArticle);
router.delete("/deleteArticle/:issue_id", isLoggedIn, deleteArticle);

// --------- Change ----------
// router.get("/downloadJournal/:journal_id", downloadJournal);
// router.delete("/deleteJournal/:journal_id", deleteJournal);

module.exports = { router };
