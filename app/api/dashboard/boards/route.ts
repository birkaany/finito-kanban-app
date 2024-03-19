import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/authOptions";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { BoardProps } from "@/types/type";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: "Unauthorized" });
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

  return NextResponse.json(boards);
}

export async function POST(req: any) {
  const body = await req.json();
  const { title, columns } = body;
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: "Unauthorized" });
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
  return NextResponse.json(newBoard);
}
