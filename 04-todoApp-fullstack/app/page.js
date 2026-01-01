import { Button } from "@/components/ui/button";
import { connectToDatabase } from "@/lib/db";

export default async function Home() {
  const db = await connectToDatabase();
  // console.log("db connnected", db)
  
  return (
    <div className="flex flex-col bg-black text-white items-center justify-center min-h-screen">
      <Button>Add todo</Button>
    </div>
  );
}
