import TodoForm from "@/components/TodoForm";
import { connectToDatabase } from "@/lib/db";

export default async function Home() {
  const db = await connectToDatabase();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Todo App</h1>
          <p className="text-muted-foreground">
            Built with Next.js, Zustand, Zod, Tanstack Query & Mongoose
          </p>
        </header>
        <main>
          <TodoForm />
        </main>
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p className="">
            This app demostrates CRUD operations with modern React patterns
          </p>
        </footer>
      </div>
    </div>
  );
}
