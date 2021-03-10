import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateTicketArgs } from "./CreateTicketArgs";
import { UpdateTicketArgs } from "./UpdateTicketArgs";
import { DeleteTicketArgs } from "./DeleteTicketArgs";
import { FindManyTicketArgs } from "./FindManyTicketArgs";
import { FindOneTicketArgs } from "./FindOneTicketArgs";
import { Ticket } from "./Ticket";
import { TicketService } from "../ticket.service";

@graphql.Resolver(() => Ticket)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TicketResolverBase {
  constructor(
    protected readonly service: TicketService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Ticket])
  @nestAccessControl.UseRoles({
    resource: "Ticket",
    action: "read",
    possession: "any",
  })
  async tickets(
    @graphql.Args() args: FindManyTicketArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Ticket[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Ticket",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Ticket, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Ticket",
    action: "read",
    possession: "own",
  })
  async ticket(
    @graphql.Args() args: FindOneTicketArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Ticket | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Ticket",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Ticket)
  @nestAccessControl.UseRoles({
    resource: "Ticket",
    action: "create",
    possession: "any",
  })
  async createTicket(
    @graphql.Args() args: CreateTicketArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Ticket> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Ticket",
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
        `providing the properties: ${properties} on ${"Ticket"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Ticket)
  @nestAccessControl.UseRoles({
    resource: "Ticket",
    action: "update",
    possession: "any",
  })
  async updateTicket(
    @graphql.Args() args: UpdateTicketArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Ticket | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Ticket",
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
        `providing the properties: ${properties} on ${"Ticket"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Ticket)
  @nestAccessControl.UseRoles({
    resource: "Ticket",
    action: "delete",
    possession: "any",
  })
  async deleteTicket(
    @graphql.Args() args: DeleteTicketArgs
  ): Promise<Ticket | null> {
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
