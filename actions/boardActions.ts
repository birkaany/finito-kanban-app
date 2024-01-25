"use server";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

type BoardData = {
  title: string;
  columns: {
    title: string;
  }[];
};

type TaskData = {
  title: string;
  subtasks: {
    title: string;
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
export const addTask = async (taskData: TaskData, columnId: string) => {
  const { title, subtasks } = taskData;
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }
  const newTask = await prisma.task.create({
    data: {
      title,
      subtasks: {
        create: subtasks,
      },
      columnId: columnId,
    },
  });
  revalidatePath("/dashboard/[id]");
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
export const getTasks = async (id: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }

  const tasks = await prisma.task.findMany({
    where: {
      columnId: id,
    },
  });
  return tasks;
};

export const getSubtasks = async (id: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }

  const subtasks = await prisma.subtask.findMany({
    where: {
      taskId: id,
    },
  });
  return subtasks;
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
};

export const getColumnNames = async (id: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }

  const columns = await prisma.column.findMany({
    where: {
      boardId: id,
    },
    select: {
      id: true,
      title: true,
    },
  });
  return columns;
};
