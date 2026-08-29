// Import the library
const ToDos = require("./todoLib");

const getAllTodos = (req, res) => {
  const todos = ToDos.getAll();
  res.json(todos);
};

const createTodo = (req, res) => {
  const { task, completed, dueDate } = req.body;
  const newTodo = ToDos.addOne(task, completed, dueDate);

  if (newTodo) {
    res.json(newTodo);
  } else {
    res.status(500).json({ message: "Failed to create todo" });
  }
};

const getTodoById = (req, res) => {
  const todoId = req.params.todoId;
  const todo = ToDos.findById(todoId);
  
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

const updateTodo = (req, res) => {
  const todoId = req.params.todoId;
  const { task, completed, dueDate } = req.body;
  const updatedTodo = ToDos.updateOneById(todoId, { task, completed, dueDate });

  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

const deleteTodo = (req, res) => {
  const todoId = req.params.todoId;
  const isDeleted = ToDos.deleteOneById(todoId);

  if (isDeleted) {
    res.json({ message: "Todo deleted successfully" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

// Export the Handlers
module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
