const express = require("express");
const router = express.Router();
const bookCtrls = require("../controllers/book");

router.post("/", bookCtrls.saveBook);

router.get("/", bookCtrls.getBooks);

router.patch("/:id", bookCtrls.updateBooks);

router.delete("/:id", bookCtrls.deleteBooks);

module.exports = router;
