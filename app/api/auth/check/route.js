import { getUserFromCookie } from "@/lib/auth"
import { NextResponse } from "next/server";

export async function GET(req) {
    const user=await getUserFromCookie(req);
    if(!user){
        return NextResponse.json(
            { status: "error", message: "Unauthorized" },
            { status: 401 }
        );
    }
    return NextResponse.json({
        status: "success",
        user,
      });
}