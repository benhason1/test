import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Ticket } from "../api/ticket/Ticket";

type Props = { id: string };

export const TicketTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Ticket,
    AxiosError,
    [string, string]
  >(["get-/api/tickets", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/tickets"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/tickets"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
