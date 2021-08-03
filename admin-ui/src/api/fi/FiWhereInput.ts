import { JsonNullableFilter } from "../../util/JsonNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type FiWhereInput = {
  customFIelds?: JsonNullableFilter;
  id?: StringFilter;
  link?: StringNullableFilter;
};
