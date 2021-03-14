import { ArgsType, Field } from "@nestjs/graphql";
import { TicketWhereUniqueInput } from "./TicketWhereUniqueInput";

@ArgsType()
class FindOneTicketArgs {
  @Field(() => TicketWhereUniqueInput, { nullable: false })
  where!: TicketWhereUniqueInput;
}

export { FindOneTicketArgs };
