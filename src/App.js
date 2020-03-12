import React, { useState, useRef, useEffect } from "react";
import TodoList from "./components/TodoList";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import "./App.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {todos.filter(todo => !todo.complete).length === 0
              ? "All done! Phew!"
              : todos.filter(todo => !todo.complete).length +
                (todos.filter(todo => !todo.complete).length === 1
                  ? " task"
                  : " tasks") +
                " left to do."}{" "}
          </Typography>
        </Toolbar>
      </AppBar>
      <Card>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </Card>
      <TextField
        inputRef={todoNameRef}
        id="outlined-basic"
        label="New todo"
        variant="outlined"
      />
      <br />
      <Button
        onClick={() => {
          handleClick();
          handleAddTodo();
        }}
        variant="contained"
        color="primary"
        mx="auto"
      >
        Add Todo
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Successfully Added Task!
        </Alert>
      </Snackbar>
      <br />
      <Button
        onClick={handleClearTodo}
        variant="contained"
        color="primary"
        mx="auto"
      >
        Clear completed
      </Button>
    </>
  );
}

export default App;
