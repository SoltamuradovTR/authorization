const { todosController } = require("../controllers/todos.controller");
const authMiddleware = require('../middlewares/auth.middleware')

const { Router } = require("express");

const router = Router();

router.get("/todos", authMiddleware, todosController.getAllTodos);
router.post("/todos", authMiddleware, todosController.createTodo);
router.delete("/todos/:id", todosController.deleteTodo);

module.exports = router;
