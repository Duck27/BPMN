const Router = require("express");
const router = new Router();
const userController = require("../controller/user.controller");

router.post("/diagram", userController.createUser);
router.get("/diagram", userController.getUsers);
router.get("/diagram/:id", userController.getOneUser);
router.put("/diagram", userController.updateUser);
router.delete("/diagram/:id", userController.deleteUser);

module.exports = router;
