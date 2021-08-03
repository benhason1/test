import { SortOrder } from "../../util/SortOrder";

export type TicketOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  isFinished?: SortOrder;
  name?: SortOrder;
  updatedAt?: SortOrder;
};
