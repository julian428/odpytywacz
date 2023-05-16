import { PrismaClient } from "@prisma/client";

declare const global: NodeJS.Global & typeof globalThis;

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

let prisma: PrismaClient;

if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: ["info"],
  });
}
prisma = global.prisma;

export default prisma;
