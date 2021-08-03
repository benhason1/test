import { JsonValue } from "type-fest";

export type Fi = {
  createdAt: Date;
  customFIelds: JsonValue | null;
  id: string;
  link: string | null;
  updatedAt: Date;
};
