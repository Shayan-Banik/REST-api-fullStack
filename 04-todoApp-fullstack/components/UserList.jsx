"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle,
} from "./ui/card";

//fetch user using tanstack query simply
async function fetchUsers() {
  const response = await fetch("/api/users");
  return response.json();
}

const UserList = () => {
  const {
    data: users,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  console.log(users);
  if (isLoading) return <p className="text-green-600"> Loading...</p>;
  if (isLoading) return <p className="text-red-600">{error.message}</p>;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-600">
          User List ( Query Example )
        </CardTitle>
      </CardHeader>
      <CardContent>
        {users?.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 mt-2 border rounded">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
};

export default UserList;
