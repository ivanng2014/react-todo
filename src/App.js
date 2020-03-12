import React, { useState, useRef, useEffect } from "react";
import TodoList from "./components/TodoList";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <TextField
        inputRef={todoNameRef}
        id="outlined-basic"
        label="New todo"
        variant="outlined"
      />
      <Button onClick={handleAddTodo} variant="contained" color="primary">
        Add Todo
      </Button>
      <Button onClick={handleClearTodo} variant="contained" color="primary">
        Clear completed
      </Button>

      <h3>
        {todos.filter(todo => !todo.complete).length === 0
          ? "All done! Phew!"
          : todos.filter(todo => !todo.complete).length +
            (todos.filter(todo => !todo.complete).length === 1
              ? " task"
              : " tasks") +
            " left to do."}{" "}
      </h3>
    </>
  );
}

export default App;
