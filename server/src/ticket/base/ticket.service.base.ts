import { PrismaService } from "nestjs-prisma";
import {
  FindOneTicketArgs,
  FindManyTicketArgs,
  TicketCreateArgs,
  TicketUpdateArgs,
  TicketDeleteArgs,
  Subset,
} from "@prisma/client";

export class TicketServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyTicketArgs>(args: Subset<T, FindManyTicketArgs>) {
    return this.prisma.ticket.findMany(args);
  }
  findOne<T extends FindOneTicketArgs>(args: Subset<T, FindOneTicketArgs>) {
    return this.prisma.ticket.findOne(args);
  }
  create<T extends TicketCreateArgs>(args: Subset<T, TicketCreateArgs>) {
    return this.prisma.ticket.create<T>(args);
  }
  update<T extends TicketUpdateArgs>(args: Subset<T, TicketUpdateArgs>) {
    return this.prisma.ticket.update<T>(args);
  }
  delete<T extends TicketDeleteArgs>(args: Subset<T, TicketDeleteArgs>) {
    return this.prisma.ticket.delete(args);
  }
}
