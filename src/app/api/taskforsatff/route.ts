import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      username,
      task1,
      task2,
      task3,
      task4,
      task5,
      task6,
      task7,
      task8,
      task9,
      task10,
      task11,
      task12,
      task13,
      task14,
      task15,
      task16,
      task17,
      task18,
      task19,
      task20,
    } = await req.json();

    // Find all users in the specified department
    const finDipartment = await prisma.user.findMany({
      where: {
        dipartment: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

  
    // Add or Edit tasks for all users in the department
    const detaBYdipartment = await Promise.all(
      finDipartment.map((user) =>
        prisma.staffWork.upsert({
          where: {
            userId: user.id, // Unique identifier for upsert
          },
          update: {
            task1,
            task2,
            task3,
            task4,
            task5,
            task6,
            task7,
            task8,
            task9,
            task10,
            task11,
            task12,
            task13,
            task14,
            task15,
            task16,
            task17,
            task18,
            task19,
            task20,
          },
          create: {
            userId: user.id,
            task1,
            task2,
            task3,
            task4,
            task5,
            task6,
            task7,
            task8,
            task9,
            task10,
            task11,
            task12,
            task13,
            task14,
            task15,
            task16,
            task17,
            task18,
            task19,
            task20,
          },
        }),
      ),
    );

    return NextResponse.json(
      {
        success: true,
        message: "Tasks successfully added or updated for staff",
      },
      { status: 200 },
    );
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
