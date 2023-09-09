import { Server, Member, Profile } from "@prisma/client";

export type ServerFull = Server & {
  members: (Member & { profile: Profile })[];
};
