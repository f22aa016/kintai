const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/kintai", require("./kintai"));

module.exports = router;