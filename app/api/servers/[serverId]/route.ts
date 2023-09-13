import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      serverId: string;
    };
  }
) {
  try {
    const profile = await currentProfile();

    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse("Gau gau", { status: 401 });
    }

    const existingServer = await db.server.findUnique({
      where: {
        id: params.serverId,
      },
    });

    if (!existingServer) {
      return redirect("/");
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      serverId: string;
    };
  }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Gau gau", { status: 401 });
    }

    const existingServer = await db.server.findUnique({
      where: {
        id: params.serverId,
      },
    });

    if (!existingServer) {
      return redirect("/");
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
