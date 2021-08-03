import { Module } from "@nestjs/common";
import { FiModuleBase } from "./base/fi.module.base";
import { FiService } from "./fi.service";
import { FiController } from "./fi.controller";
import { FiResolver } from "./fi.resolver";

@Module({
  imports: [FiModuleBase],
  controllers: [FiController],
  providers: [FiService, FiResolver],
  exports: [FiService],
})
export class FiModule {}
