import { registerSchema } from "../../../lib/validationSchemas";
import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const validation = registerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.errors[0].message },
      { status: 400 }
    );
  }
  // Check if the user does exist
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }
  // Hash password
  const hashPassword = await bcrypt.hash(body.password, 5);

  // Store user in DB
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: hashPassword,
    },
  });
  return NextResponse.json(user, { status: 201 });
}
