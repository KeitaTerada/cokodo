import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

export default async function prismaExample() {
  const newTodos = await prisma.toods.create({
    data: {
      title: "getup",
      description: "getup description",
    },
  });

  const toods = await prisma.user.findMany();
}
