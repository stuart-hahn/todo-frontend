import React from "react";
import axios from "axios";

const Todo = ({ todo, onDelete }) => {
  // Toggle the status of a todo
  const toggleCompleted = () => {
    axios
      .patch(`http://localhost:3000/todos/${todo.id}`, {
        completed: !todo.completed,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating todo: ", error);
      });
  };

  const deleteTodo = () => {
    axios
      .delete(`http://localhost:3000/todos/${todo.id}`)
      .then((response) => {
        onDelete(todo.id); // Remove the todo from the UI without reloading
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <div
      onClick={toggleCompleted}
      style={{
        cursor: "pointer",
        textDecoration: todo.completed ? "line-through" : "none",
      }}
    >
      <h2>{todo.title}</h2>
      <p>{todo.completed ? "Completed" : "Incomplete"}</p>
      <button onClick={deleteTodo}>Delete</button>
    </div>
  );
};

export default Todo;
