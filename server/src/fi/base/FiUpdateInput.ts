import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsOptional, IsString } from "class-validator";
import { GraphQLJSONObject } from "graphql-type-json";
import { JsonValue } from "type-fest";
@InputType()
class FiUpdateInput {
  @ApiProperty({
    required: false,
  })
  @IsJSON()
  @IsOptional()
  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  customFIelds?: JsonValue | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  link?: string | null;
}
export { FiUpdateInput };
