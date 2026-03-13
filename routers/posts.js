const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");

router.get("/", postsController.index);

router.delete("/:id", postsController.destroy);

module.exports = router;
