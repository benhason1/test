import { PrismaService } from "nestjs-prisma";
import { Prisma, Fi } from "@prisma/client";

export class FiServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.FiFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FiFindManyArgs>
  ): Promise<number> {
    return this.prisma.fi.count(args);
  }

  async findMany<T extends Prisma.FiFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FiFindManyArgs>
  ): Promise<Fi[]> {
    return this.prisma.fi.findMany(args);
  }
  async findOne<T extends Prisma.FiFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.FiFindUniqueArgs>
  ): Promise<Fi | null> {
    return this.prisma.fi.findUnique(args);
  }
  async create<T extends Prisma.FiCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FiCreateArgs>
  ): Promise<Fi> {
    return this.prisma.fi.create<T>(args);
  }
  async update<T extends Prisma.FiUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FiUpdateArgs>
  ): Promise<Fi> {
    return this.prisma.fi.update<T>(args);
  }
  async delete<T extends Prisma.FiDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.FiDeleteArgs>
  ): Promise<Fi> {
    return this.prisma.fi.delete(args);
  }
}
