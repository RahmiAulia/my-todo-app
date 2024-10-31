// src/api/todoApi.js

const TODO_STORAGE_KEY = 'todos';

// Mengambil todo dari localStorage
export const fetchTodos = async () => {
  const todos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)) || [];
  return todos;
};

// Menambahkan todo baru ke localStorage
export const addTodo = async (todo) => {
  const todos = await fetchTodos();
  const newTodo = { ...todo, id: Date.now() }; // Buat ID dari timestamp
  const updatedTodos = [...todos, newTodo];
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(updatedTodos));
  return newTodo;
};

// Menghapus todo dari localStorage
export const deleteTodo = async (id) => {
  const todos = await fetchTodos();
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(updatedTodos));
  return id; // Kembalikan ID yang dihapus
};

// Memperbarui todo di localStorage
export const updateTodo = async (updatedTodo) => {
  const todos = await fetchTodos();
  const updatedTodos = todos.map((todo) => 
    todo.id === updatedTodo.id ? updatedTodo : todo
  );
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(updatedTodos));
  return updatedTodo;
};
