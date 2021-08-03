import { ArgsType, Field } from "@nestjs/graphql";
import { FiWhereUniqueInput } from "./FiWhereUniqueInput";

@ArgsType()
class FiFindUniqueArgs {
  @Field(() => FiWhereUniqueInput, { nullable: false })
  where!: FiWhereUniqueInput;
}

export { FiFindUniqueArgs };
