const { Router } = require("express");

const { addUser, addArea } = require("../controllers/user.js");
const { validateJWT, isAdmin } = require("../middleware");

const router = Router();

router.post("/", [validateJWT, isAdmin], addUser);
router.post("/area/:userId", [validateJWT, isAdmin], addArea);

module.exports = router;
