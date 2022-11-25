const router = require("express").Router();
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const { articleUpload, imageUpload } = require("../middlewares/multer");

const { 
  signup, 
  login,
  logout, 
  userDetails,
  userDetailsToken, 
  editUserDetails,
  changePassword,
  forgetPassword,
  addProfilePhoto,
  getAllAuthors
} = require("../controllers/userController");

const {
  createJournal,
  editJournal,
  getAllJournals,
  getAllJournalIds,
  viewJournal,
  addEditors,
  removeEditors,
  changeAuthor,
  deleteJournal,
  journalNameByIds
} = require("../controllers/journalController");

const {
  addArticle,
  downloadArticle,
  deleteArticle,
  referArticle,
  allArticlesForReferral,
  articleStatus,
  getNumberVolumes,
  volume,
  searchArticles
} = require("../controllers/articleController");

// User Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/userDetails/:id", userDetails);
router.get("/userDetailsToken", isLoggedIn, userDetailsToken);
router.patch("/editUserDetails", isLoggedIn, editUserDetails);
router.patch("/changePassword", isLoggedIn, changePassword);
router.post("/forgetPassword", forgetPassword);
router.patch("/addProfilePhoto", isLoggedIn, imageUpload.single("image"), addProfilePhoto);
router.post("/getAllAuthors", getAllAuthors);

//Journal Operations
router.post("/createJournal", isAdmin, imageUpload.single("image"), createJournal);
router.patch("/editJournal/:journal_id", isLoggedIn, editJournal);
router.get("/getAllJournals", getAllJournals);
router.get("/getAllJournalIds", getAllJournalIds);
router.get("/viewJournal/:journal_id", viewJournal);
router.patch("/addEditors/:journal_id", isLoggedIn, addEditors);
router.patch("/removeEditors/:journal_id", isAdmin, removeEditors);
router.patch("/changeAuthor/:journal_id", isAdmin, changeAuthor);
router.delete("/deleteJournal/:journal_id", isAdmin, deleteJournal);
router.post("/journalNameByIds", isLoggedIn, journalNameByIds);

//Article Operations
router.post("/addArticle", isLoggedIn, articleUpload.single("article"), addArticle);
router.get("/downloadArticle/:article_id", downloadArticle);
router.delete("/deleteArticle/:article_id", isLoggedIn, deleteArticle);
router.post("/referArticle/:article_id", isLoggedIn, referArticle);
router.get("/allArticlesForReferral", isLoggedIn, allArticlesForReferral);
router.get("/articleStatus", isLoggedIn, articleStatus);
router.get("/getNumberVolumes/:journal_id", getNumberVolumes);
router.get("/:journal_id/volume/:year", volume);
router.post("/searchArticles", searchArticles);

// --------- Change ----------
// router.get("/downloadJournal/:journal_id", downloadJournal);
// router.delete("/deleteJournal/:journal_id", deleteJournal);

module.exports = { router };
