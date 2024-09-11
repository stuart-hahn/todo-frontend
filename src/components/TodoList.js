import React, { useEffect, useState } from "react";
import axios from "axios";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos when the component is mounted
  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  // Handle form submission to create a new todo
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/todos", { title: newTodo, completed: false })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
      });
  };

  // Handle deleting a todo
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TodoList;
