import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = req.json();
  console.log(body);

  // const boardId = req.query.boardId;
  // const columns = await prisma.column.findMany({
  //     where: {
  //     boardId: boardId,
  //     },
  // });
  // return NextResponse.json(columns);
}
