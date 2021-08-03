import { ArgsType, Field } from "@nestjs/graphql";
import { TicketWhereUniqueInput } from "./TicketWhereUniqueInput";

@ArgsType()
class TicketFindUniqueArgs {
  @Field(() => TicketWhereUniqueInput, { nullable: false })
  where!: TicketWhereUniqueInput;
}

export { TicketFindUniqueArgs };
