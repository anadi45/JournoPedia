const router = require("express").Router();
const {test} = require("../controllers/test");

router.route("/").get(test)

module.exports = {router};