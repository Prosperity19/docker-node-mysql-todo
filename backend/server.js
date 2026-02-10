const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// In-memory To-Do store (can later be replaced with DB)
let todos = [];

// Health check
app.get("/", (req, res) => {
  res.json({ message: "To-Do API is running 🚀" });
});

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Create a new todo
app.post("/todos", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTodo = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date()
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "To-Do not found" });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;

  todos = todos.filter(t => t.id !== id);

  if (todos.length === initialLength) {
    return res.status(404).json({ error: "To-Do not found" });
  }

  res.status(204).send();
});

// Start server
app.listen(3000, "0.0.0.0", () => {
  console.log("Backend running on port 3000");
});
