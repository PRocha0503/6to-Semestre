const { Router } = require("express");

const { addUser, addArea } = require("../controllers/user.js");
const { validateJWT } = require("../middleware");

const router = Router();

router.post("/", addUser);
router.post("/area/:userId", validateJWT, addArea);

module.exports = router;
