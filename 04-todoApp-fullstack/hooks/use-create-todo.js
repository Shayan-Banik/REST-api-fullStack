'use client'

import { createTodo, getTodos } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/todo-store";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const todoKeys = {
  all: ["todo"],
  lists: () => [...todoKeys.all, "list"],
};

export function useCreateTodos() {
  const queryClient = useQueryClient();

  const addTodo = useTodoStore((state) => state.addTodo);

  return useMutation({
    mutationFn: (data) => createTodo(data),
    onSuccess: (result) => {
      if (result.success) {
        addTodo(result.data);

        queryClient.invalidateQueries({
          queryKey: todoKeys.lists(),
        });
      }
    },
  });
}

export function useGetTodos() {
  const setTodos = useTodoStore((state) => state.setTodos);

  return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: async () => {
      const result = await getTodos();
      console.log(result);

      if (result.success) {
        setTodos(result.data);
        return result.data;
      }
      return new Error(result.error);
    },
  });
}
