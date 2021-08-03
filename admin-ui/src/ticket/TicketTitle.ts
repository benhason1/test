import { Ticket as TTicket } from "../api/ticket/Ticket";

export const TICKET_TITLE_FIELD = "name";

export const TicketTitle = (record: TTicket) => {
  return record.name;
};
