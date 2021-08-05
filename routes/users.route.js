const { userController } = require("../controllers/users.controller");
const { Router } = require("express");

const router = Router();

router.get("/users", userController.getAllUsers);
router.post("/users", userController.addUser);
router.post('/login', userController.login)

module.exports = router;
