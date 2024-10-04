import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const account = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  console.log("@@ account: ", account);

  return NextResponse.json({
    exists: !!account,
  });
}
