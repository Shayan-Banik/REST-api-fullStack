const users = [
  { id: 1, name: "John Doe", email: "abc@gamil.com" },
  { id: 2, name: "Jane roxx", email: "xyz@gamil.com" },
  { id: 3, name: "John Doe", email: "pqr@gamil.com" },
  { id: 4, name: "Jane roxx", email: "uvw@gamil.com" },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Response.json(users);
}
