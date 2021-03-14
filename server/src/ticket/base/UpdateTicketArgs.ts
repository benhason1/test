import { ArgsType, Field } from "@nestjs/graphql";
import { TicketWhereUniqueInput } from "./TicketWhereUniqueInput";
import { TicketUpdateInput } from "./TicketUpdateInput";

@ArgsType()
class UpdateTicketArgs {
  @Field(() => TicketWhereUniqueInput, { nullable: false })
  where!: TicketWhereUniqueInput;
  @Field(() => TicketUpdateInput, { nullable: false })
  data!: TicketUpdateInput;
}

export { UpdateTicketArgs };
