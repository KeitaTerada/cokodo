import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { status }: { status: boolean } = await request.json();

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
