const { Router } = require("express");

const {
	addUser,
	addArea,
	getUsers,
	removeArea,
	deleteUser,
	makeAdmin,
	getProfile,
} = require("../controllers/user.js");
const { validateJWT, isAdmin } = require("../middleware");

const router = Router();
router.get("/", [validateJWT, isAdmin], getUsers);

router.post(
	"/",
	// [validateJWT, isAdmin],
	addUser
);

router.post("/area/:userId", [validateJWT, isAdmin], addArea);
router.delete("/area/:userId", [validateJWT, isAdmin], removeArea);
router.delete("/:userId", [validateJWT, isAdmin], deleteUser);
router.put("/makeAdmin/:userId", [validateJWT, isAdmin], makeAdmin);
router.get("/myProfile", validateJWT, getProfile);

module.exports = router;
