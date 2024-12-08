import prisma from "@/lib/prisma";
import { formatRelativeMonth } from "@/lib/utils";
import { serchSchema } from "@/lib/vallidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, monthname } = await req.json();

    // const data = serchSchema.parse({ username, dipartment, monthname });

    const userData = await prisma.user.findFirst({
      where: {
        id: username,
      },
      select: {
        displayname: true,
        dipartment: true,
        Todayswork: {
          select: {
            content: true,
            createdAt: true,
          },
        },
      },
    });

    const d = userData?.Todayswork.filter((v) => {
      if (monthname && monthname !== "Today") {
        // Filter by the provided monthname
        return monthname === formatRelativeMonth(v.createdAt);
      } else {
        // Filter for today's work only when monthname is not provided
        const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format
        return v.createdAt.toISOString().split("T")[0] === today; // Match the date only (YYYY-MM-DD)
      }
    });

    const uniqueDates = new Set(
      d?.map((v) => v.createdAt.toISOString().split("T")[0]), // Extract date portion
    );

    return NextResponse.json({
      department: userData?.dipartment,
      displanem: userData?.displayname,
      totalwork: uniqueDates.size,
      userdata: d,
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
