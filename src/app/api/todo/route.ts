import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todos.findMany();
  return Response.json(todos);
}

export async function POST(request: Request) {
  /* request.json()は重複してるとエラーが出る */
  const body = await request.json();
  const { title, description }: { title: string; description: string } = body;

  const response = await prisma.todos.create({
    data: {
      title: title,
      description: description,
    },
  });

  return Response.json(response);
}

export const dynamic = "force-static";
