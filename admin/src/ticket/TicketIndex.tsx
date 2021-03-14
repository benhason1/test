import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TicketList } from "./TicketList";
import { CreateTicket } from "./CreateTicket";
import { Ticket } from "./Ticket";

export const TicketIndex = (): React.ReactElement => {
  useBreadcrumbs("/tickets/", "Tickets");

  return (
    <Switch>
      <PrivateRoute exact path={"/tickets/"} component={TicketList} />
      <PrivateRoute path={"/tickets/new"} component={CreateTicket} />
      <PrivateRoute path={"/tickets/:id"} component={Ticket} />
    </Switch>
  );
};
