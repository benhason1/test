import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { FiService } from "./fi.service";
import { FiControllerBase } from "./base/fi.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("fis")
@common.Controller("fis")
export class FiController extends FiControllerBase {
  constructor(
    protected readonly service: FiService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
