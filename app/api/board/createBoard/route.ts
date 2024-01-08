import Board from "@/models/Board";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connect from "@/lib/db";

export const POST = async (req: any) => {
  if (req.method === "POST") {
    try {
      const session = await getServerSession();
      if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      await connect();

      const { name } = await req.json();

      const newBoard = new Board({
        name,
      });

      await newBoard.save();
      return new NextResponse("Board created successfully", { status: 201 });
    } catch (err) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Method is not allowed", { status: 205 });
  }
};
