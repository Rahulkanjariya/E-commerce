const express = require("express");
const router = express.Router();

router.use(require("./userRoute"));
router.use(require("./addressRoute"));
router.use(require("./categoryRoute"));
router.use(require("./subCategoryRoute"));
router.use(require("./brandRoute"));

module.exports = router;
