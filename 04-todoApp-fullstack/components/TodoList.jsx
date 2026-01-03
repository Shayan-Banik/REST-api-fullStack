"use client";

import React from "react";
import { useGetTodos } from "@/hooks/use-create-todo";
import { useTodoStore } from "@/store/todo-store";
import { Card, CardContent } from "./ui/card";
import { Loader2 } from "lucide-react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { data: todoslist, isLoading, error } = useGetTodos();
  const filteredTodos = useTodoStore((state) => state.filteredTodos());

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-destructive">
            Error loading todos {error.message}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No todos found</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="space-y-3">
      {
        filteredTodos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
        ))
      }
    </div>
  );
};

export default TodoList;
