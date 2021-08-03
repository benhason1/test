import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateFiArgs } from "./CreateFiArgs";
import { UpdateFiArgs } from "./UpdateFiArgs";
import { DeleteFiArgs } from "./DeleteFiArgs";
import { FiFindManyArgs } from "./FiFindManyArgs";
import { FiFindUniqueArgs } from "./FiFindUniqueArgs";
import { Fi } from "./Fi";
import { FiService } from "../fi.service";

@graphql.Resolver(() => Fi)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class FiResolverBase {
  constructor(
    protected readonly service: FiService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Fi",
    action: "read",
    possession: "any",
  })
  async _fisMeta(
    @graphql.Args() args: FiFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Fi])
  @nestAccessControl.UseRoles({
    resource: "Fi",
    action: "read",
    possession: "any",
  })
  async fis(
    @graphql.Args() args: FiFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Fi[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Fi",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Fi, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Fi",
    action: "read",
    possession: "own",
  })
  async fi(
    @graphql.Args() args: FiFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Fi | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Fi",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Fi)
  @nestAccessControl.UseRoles({
    resource: "Fi",
    action: "create",
    possession: "any",
  })
  async createFi(
    @graphql.Args() args: CreateFiArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Fi> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Fi",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Fi"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Fi)
  @nestAccessControl.UseRoles({
    resource: "Fi",
    action: "update",
    possession: "any",
  })
  async updateFi(
    @graphql.Args() args: UpdateFiArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Fi | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Fi",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Fi"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Fi)
  @nestAccessControl.UseRoles({
    resource: "Fi",
    action: "delete",
    possession: "any",
  })
  async deleteFi(@graphql.Args() args: DeleteFiArgs): Promise<Fi | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
