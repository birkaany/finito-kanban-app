"use server";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const addBoard = async (boardData) => {
  const { title, columns } = boardData;

  const session = await getServerSession(authOptions);
  if (!session) {
    // return response
    return { error: "Unauthorized" };
  }
  const { user } = session;
  const newBoard = await prisma.board.create({
    data: {
      title,
      columns: {
        create: columns,
      },
      userId: user.id,
    },
  });
  revalidatePath("/dashboard");
};

export const getBoards = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }
  const { user } = session;
  const boards = await prisma.board.findMany({
    where: {
      userId: user.id,
    },
  });
  return boards;
};

export const getBoardNames = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }
  const { user } = session;
  const boards = await prisma.board.findMany({
    where: {
      userId: user.id,
    },
    select: {
      title: true,
    },
  });
  return boards;
};
