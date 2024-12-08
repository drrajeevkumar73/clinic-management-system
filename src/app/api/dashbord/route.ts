import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { formatRelativeMonth } from "@/lib/utils"; // Assuming this formats the date to "January", "February" etc.
import { calenderSchema } from "@/lib/vallidation";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) throw Error("unauthorized");

    const { monthname } = await req.json();
    const body = calenderSchema.parse({ monthname });

    const dat = await prisma.todayswork.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { createdAt: "desc" },
      select: {
        content: true,
        createdAt: true,
      },
    });

    const d = dat.filter(
      (v:{ content: string; createdAt: Date }) => body.monthname === formatRelativeMonth(v.createdAt),
    );

      // Count unique dates for "Total Present"
      const uniqueDates = new Set(
        d.map((v:{ content: string; createdAt: Date }) => v.createdAt.toISOString().split("T")[0]) // Extract date portion
      );
  
      return NextResponse.json({
        totalPresent: uniqueDates.size, // Unique days count
        data: d, // All records for the month
      });
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
