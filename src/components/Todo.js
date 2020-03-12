import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  return (
    <>
      <label>
        <Checkbox checked={todo.complete} onChange={handleTodoClick} />
        {todo.name}
      </label>
      <br />
    </>
  );
}
