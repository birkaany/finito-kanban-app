import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string(),
});

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { email, password, passwordConfirm } = body;
    console.log(email, password, passwordConfirm);
    // Checking passwords matching
    if (password !== passwordConfirm) {
      return NextResponse.json("Passwords do not match", { status: 400 });
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json("Invalid input data", { status: 400 });
  }
}
