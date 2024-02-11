import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todos.findMany();
  return Response.json(todos);
}

export async function POST(request: Request) {
  const { title }: { title: string } = await request.json();
  const { description }: { description: string } = await request.json();

  const response = await prisma.todos.create({
    data: {
      title,
      description,
    },
  });
  return Response.json(response);
}
