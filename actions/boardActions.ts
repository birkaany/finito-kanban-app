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
  description: string;
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
  const { title, subtasks, description } = taskData;
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }
  const newTask = await prisma.task.create({
    data: {
      title,
      description,
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
    include: {
      subtasks: true,
    },
  });
  return tasks;
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

export const updateTask = async (id: string, updatedTask) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }

  const { title, description, subtasks } = updatedTask;

  const updatedSubtasks = subtasks.map((subtask) => ({
    where: { id: subtask.id },
    data: {
      title: subtask.title,
    },
  }));
  const updated = await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      subtasks: {
        updateMany: updatedSubtasks,
      },
    },
    include: {
      subtasks: true,
    },
  });

  return updated;
};

export const getTaskWithSubtasks = async (id: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }

  const task = await prisma.task.findUnique({
    where: {
      id: id,
    },
    include: {
      subtasks: true,
    },
  });
  return task;
};
