import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }

  const board = await prisma.column.findMany({
    where: {
      boardId: params.boardId,
    },
    include: {
      task: {
        include: {
          subtasks: true,
        },
      },
    },
  });
  return NextResponse.json(board);
}
