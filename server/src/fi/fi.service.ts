import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { FiServiceBase } from "./base/fi.service.base";

@Injectable()
export class FiService extends FiServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
