import { ArgsType, Field } from "@nestjs/graphql";
import { FiCreateInput } from "./FiCreateInput";

@ArgsType()
class CreateFiArgs {
  @Field(() => FiCreateInput, { nullable: false })
  data!: FiCreateInput;
}

export { CreateFiArgs };
