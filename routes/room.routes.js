const router = require("express").Router();
const { requireLogin } = require("../middlewares/route-guard")


router.use(requireLogin);
router.get("/yourrooms", (req, res, next) => {
    res.render("yourrooms");
  });

module.exports = router;
