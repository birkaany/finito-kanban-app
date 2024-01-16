import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { getSession } from "next-auth/react";
import authOptions from "../auth/[...nextauth]/authOptions";

export async function POST(req: Request, res: Response) {
  try {
    // Oturumu al
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { user } = session;
    const { title, columns } = await req.json();

    // Kullanıcının kimliğiyle Board oluştur
    const createdBoard = await prisma.board.create({
      data: {
        title,
        columns: {},
        userId: user.id,
      },
    });

    return NextResponse.json(
      { message: "Board created", board: createdBoard },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating board:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
