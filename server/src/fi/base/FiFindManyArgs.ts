import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { FiWhereInput } from "./FiWhereInput";
import { Type } from "class-transformer";
import { FiOrderByInput } from "./FiOrderByInput";

@ArgsType()
class FiFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => FiWhereInput,
  })
  @Field(() => FiWhereInput, { nullable: true })
  @Type(() => FiWhereInput)
  where?: FiWhereInput;

  @ApiProperty({
    required: false,
    type: FiOrderByInput,
  })
  @Field(() => FiOrderByInput, { nullable: true })
  @Type(() => FiOrderByInput)
  orderBy?: FiOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { FiFindManyArgs };
