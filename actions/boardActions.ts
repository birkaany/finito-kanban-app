"use server";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/prisma/prisma";
import { BoardProps, TaskProps } from "@/types/type";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const addBoard = async (boardData: BoardProps) => {
  const { title, columns } = boardData;

  const session = await getServerSession(authOptions);
  if (!session) {
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
export const addTask = async (taskData: TaskProps, columnId: string) => {
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
  revalidatePath("/dashboard/[slug]");
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

export const updateTask = async (id: string, updatedTask: TaskProps) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }

  const { title, description, subtasks } = updatedTask;

  const updatedSubtasks = subtasks?.map((subtask) => ({
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
  revalidatePath("/dashboard/[slug]");
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

export const deleteTask = async (id: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }

  await prisma.subtask.deleteMany({
    where: {
      taskId: id,
    },
  });

  const deletedTask = await prisma.task.delete({
    where: {
      id: id,
    },
    include: {
      subtasks: true,
    },
  });
  revalidatePath("/dashboard/[slug]");
  return deletedTask;
};
