import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TicketWhereInput } from "./TicketWhereInput";
import { Type } from "class-transformer";
import { TicketOrderByInput } from "./TicketOrderByInput";

@ArgsType()
class TicketFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => TicketWhereInput,
  })
  @Field(() => TicketWhereInput, { nullable: true })
  @Type(() => TicketWhereInput)
  where?: TicketWhereInput;

  @ApiProperty({
    required: false,
    type: TicketOrderByInput,
  })
  @Field(() => TicketOrderByInput, { nullable: true })
  @Type(() => TicketOrderByInput)
  orderBy?: TicketOrderByInput;

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

export { TicketFindManyArgs };
