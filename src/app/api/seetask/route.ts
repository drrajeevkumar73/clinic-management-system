import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) throw Error("unathorized");

    const useWork=await prisma.staffWork.findMany({
        where:{
            userId:user.id
        },
     orderBy:{createdAt:"desc"}
        
    })

    return NextResponse.json(useWork)
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
