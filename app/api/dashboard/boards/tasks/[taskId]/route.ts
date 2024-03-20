import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: any) {
  const body = await req.json();
  const taskId = body.id;
  const updatedTask = body.updatedTask;
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title: updatedTask.title,
      description: updatedTask.description,
      subtasks: {
        updateMany: updatedTask.subtasks?.map((subtask: any) => ({
          where: { id: subtask.id },
          data: {
            title: subtask.title,
          },
        })),
      },
    },
  });
  return NextResponse.json(task);
}

export async function POST(req: any) {
  const body = await req.json();

  const task = await prisma.task.create({
    data: {
      title: body.newTask.title,
      description: body.newTask.description,
      subtasks: {
        create: body.newTask.subtasks,
      },
      column: {
        connect: {
          id: body.id,
        },
      },
    },
  });
  return NextResponse.json(task);
}
