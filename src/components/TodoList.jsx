import React, { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  TextField,
} from "@mui/material";
import "../components/style/TodoList.css";

const TodoList = () => {
  const {
    todos,
    error,
    isLoading,
    addTodoMutation,
    deleteTodoMutation,
    updateTodoMutation,
  } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo) {
      addTodoMutation.mutate(
        { title: newTodo, completed: false },
        {
          onSuccess: () => {
            setNewTodo(""); // Reset input setelah berhasil menambahkan todo
          },
        }
      );
    }
  };

  const handleCheckboxChange = (todo) => {
    updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="todoTitle">Todo List</h1>
      {/* Input untuk menambahkan todo baru */}
      <div></div>
      <TextField
        label="Add a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        variant="outlined"
        sx={{
          width: "300px",
          height: "50px",
          marginRight: "20px",
          marginLeft: "20px",
          marginBottom: "20px",
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTodo}
        disabled={addTodoMutation.isLoading}
        sx={{
          marginTop: "10px",
        }}
      >
        {addTodoMutation.isLoading ? "Adding..." : "Add Todo"}
      </Button>

      {/* Tabel untuk menampilkan daftar todo */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Completed</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(todo)}
                  />
                </TableCell>
                <TableCell
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    // startIcon={<DeleteIcon />}
                    onClick={() => deleteTodoMutation.mutate(todo.id)}
                  >
                    {deleteTodoMutation.isLoading ? "Deleting..." : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TodoList;
