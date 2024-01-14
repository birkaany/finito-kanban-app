import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const { user } = session;
  const boards = await prisma.board.findMany({
    where: {
      userId: user.id,
    },
  });
  return NextResponse.json(boards);
}
