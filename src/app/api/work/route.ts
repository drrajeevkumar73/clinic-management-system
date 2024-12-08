import { formSchema } from "@/lib/vallidation";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) throw Error("unauthorized");

    const { content } = await req.json();

    const data = formSchema.parse({ content });

    const savedata = await prisma.todayswork.create({
      data: {
        userId: user.id,
        content: data.content,
      },
    });

    return NextResponse.json(savedata)
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
