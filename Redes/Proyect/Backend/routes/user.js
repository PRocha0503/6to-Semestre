const { Router } = require("express");

const { postUser } = require("../controllers/user.js");
const { validateJWT } = require("../middleware");

const router = Router();

router.post("/", postUser);
router.get("/test", validateJWT, (req, res) => {
	res.send({ uid: req.userID });
});
module.exports = router;
