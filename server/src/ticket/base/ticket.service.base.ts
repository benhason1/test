import { PrismaService } from "nestjs-prisma";
import { Prisma, Ticket } from "@prisma/client";

export class TicketServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.TicketFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TicketFindManyArgs>
  ): Promise<number> {
    return this.prisma.ticket.count(args);
  }

  async findMany<T extends Prisma.TicketFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TicketFindManyArgs>
  ): Promise<Ticket[]> {
    return this.prisma.ticket.findMany(args);
  }
  async findOne<T extends Prisma.TicketFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TicketFindUniqueArgs>
  ): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique(args);
  }
  async create<T extends Prisma.TicketCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TicketCreateArgs>
  ): Promise<Ticket> {
    return this.prisma.ticket.create<T>(args);
  }
  async update<T extends Prisma.TicketUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TicketUpdateArgs>
  ): Promise<Ticket> {
    return this.prisma.ticket.update<T>(args);
  }
  async delete<T extends Prisma.TicketDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TicketDeleteArgs>
  ): Promise<Ticket> {
    return this.prisma.ticket.delete(args);
  }
}
