// src/hooks/useTodos.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from '../api/todoApi';

export const useTodos = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  return {
    todos: data ? data.slice(0, 10) : [], // Batasi 10 data
    error,
    isLoading,
    addTodoMutation,
    deleteTodoMutation,
    updateTodoMutation,
  };
};
