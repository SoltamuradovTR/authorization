const Todo = require("../models/Todo.model");
const jwt = require("jsonwebtoken");

module.exports.todosController = {
  getAllTodos: async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
      return res.status(401).json("Не верный тип токена");
    }

    try {
      const payload = await jwt.verify(token, process.env.SECRET_JWT_KEY);

      const todo = await Todo.findById(id);

      if (todo.user.toString() === payload.id) {
        await todo.remove();

        return res.json("Удалено");
      }

      return res.status(401).json("Ошибка. Нет доступа")

    } catch (e) {
      return res.status(401).json("Не верный токен");
    }
  },

  createTodo: async (req, res) => {
    const { text } = req.body;

    try {
      const todo = await Todo.create({
        user: req.user.id,
        text,
      });

      return res.json(todo)
    } catch (e) {
      return res.status(401).json("Не верный токен");
    }
  },
};
