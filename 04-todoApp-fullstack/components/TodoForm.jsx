"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { createTodoSchema } from "@/validation/todo.validation";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { useCreateTodos } from "@/hooks/use-create-todo";
import { toast } from "sonner";

const TodoForm = () => {
  const [isopen, setIsOpen] = useState(false);
  const createTodoMutation = useCreateTodos();

  const Form = useForm({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await createTodoMutation.mutateAsync(data);

      if (result.success) {
        toast.success("Todo created successfully");
        Form.reset();
        setIsOpen(false);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to create todo");
    }
  };

  if (!isopen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-full mb-6" size="lg">
        Add Todo
      </Button>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create New Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={Form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...Form.register("title")}
              placeholder="Enter todo title..."
              className="mt-2"
            />
            {Form.formState.errors.title && (
              <p className="text-destructive text-sm mt-1">
                {Form.formState().errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...Form.register("description")}
              placeholder="Enter todo description..."
              className="mt-2"
            />
            {Form.formState.errors.description && (
              <p className="text-destructive text-sm mt-1">
                {Form.formState().errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="priority" className="mb-2">Priority</Label>
            <Select
              value={Form.watch("priority")}
              onValueChange={(value) => Form.setValue("priority", value)}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Priority</SelectLabel>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={createTodoMutation.isPending}
              size="lg">
              {createTodoMutation.isPending ? "Creating..." : "Create Todo"}
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false), Form.reset();
              }}
              type="button"
              className="bg-red-500 hover:bg-red-600"
              size="lg">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TodoForm;
