import React from "react";

const Todo = ({ todo }) => {
  return (
    <div>
      <h2>{todo.title}</h2>
      <p>{todo.completed ? "Completed" : "Incomplete"}</p>
    </div>
  );
};

export default Todo;
