import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { status }: { status: boolean } = await request.json();
  // リクエストのidを元にstatusを反転させる
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
  const id = Number(params.id);
  const response = await prisma.todos.delete({
    where: {
      id,
    },
  });
  return Response.json(response);
}

export const dynamic = "force-static";
