import { ArgsType, Field } from "@nestjs/graphql";
import { TicketWhereUniqueInput } from "./TicketWhereUniqueInput";

@ArgsType()
class DeleteTicketArgs {
  @Field(() => TicketWhereUniqueInput, { nullable: false })
  where!: TicketWhereUniqueInput;
}

export { DeleteTicketArgs };
