"use server";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

type BoardData = {
  title: string;
  columns: {
    title: string;
    order: number;
  }[];
};

export const addBoard = async (boardData: BoardData) => {
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
      id: true,
      title: true,
    },
  });
  return boards;
};

export const getColumns = async (id: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }

  const columns = await prisma.column.findMany({
    where: {
      boardId: id,
    },
  });
  return columns;
  revalidatePath("/dashboard/[id]");
};
