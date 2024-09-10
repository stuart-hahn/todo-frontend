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
  const handleSubmit = (e) => {
    e.preventDefault();

    // POST request to create a new todo
    axios
      .post("http://localhost:3000/todos", {
        title: newTodo,
        completed: false,
      })
      .then((response) => {
        // Add the new todo to the list of todos
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => {
        console.log("Error creating todo: ", error);
      });
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
      </form>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
