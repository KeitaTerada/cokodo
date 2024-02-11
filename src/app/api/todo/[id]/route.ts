import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { Todo } from "@/app/types/todo";

const prisma = new PrismaClient();
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id: Number = ;
  const { status }: { status: boolean } = await request.json();
  // リクエストのidを元にcompletedを反転させる
  const response = await prisma.todos.update({
    where: {
      id,
    },
    data: {
      status: !status,
    },
  });
  return Response.json(response);
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const response = await prisma.todos.delete({
    where: {
      id,
    },
  });
  return Response.json(response);
}
