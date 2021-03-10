import { ArgsType, Field } from "@nestjs/graphql";
import { TicketWhereInput } from "./TicketWhereInput";

@ArgsType()
class FindManyTicketArgs {
  @Field(() => TicketWhereInput, { nullable: true })
  where?: TicketWhereInput;
}

export { FindManyTicketArgs };
