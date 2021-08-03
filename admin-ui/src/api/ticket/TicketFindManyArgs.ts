import { TicketWhereInput } from "./TicketWhereInput";
import { TicketOrderByInput } from "./TicketOrderByInput";

export type TicketFindManyArgs = {
  where?: TicketWhereInput;
  orderBy?: TicketOrderByInput;
  skip?: number;
  take?: number;
};
