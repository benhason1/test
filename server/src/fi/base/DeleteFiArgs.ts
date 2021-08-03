import { ArgsType, Field } from "@nestjs/graphql";
import { FiWhereUniqueInput } from "./FiWhereUniqueInput";

@ArgsType()
class DeleteFiArgs {
  @Field(() => FiWhereUniqueInput, { nullable: false })
  where!: FiWhereUniqueInput;
}

export { DeleteFiArgs };
