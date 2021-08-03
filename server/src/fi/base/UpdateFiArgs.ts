import { ArgsType, Field } from "@nestjs/graphql";
import { FiWhereUniqueInput } from "./FiWhereUniqueInput";
import { FiUpdateInput } from "./FiUpdateInput";

@ArgsType()
class UpdateFiArgs {
  @Field(() => FiWhereUniqueInput, { nullable: false })
  where!: FiWhereUniqueInput;
  @Field(() => FiUpdateInput, { nullable: false })
  data!: FiUpdateInput;
}

export { UpdateFiArgs };
