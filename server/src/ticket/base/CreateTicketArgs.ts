import { ArgsType, Field } from "@nestjs/graphql";
import { TicketCreateInput } from "./TicketCreateInput";

@ArgsType()
class CreateTicketArgs {
  @Field(() => TicketCreateInput, { nullable: false })
  data!: TicketCreateInput;
}

export { CreateTicketArgs };
