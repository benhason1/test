import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  ToggleField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Ticket as TTicket } from "../api/ticket/Ticket";
import { TicketUpdateInput } from "../api/ticket/TicketUpdateInput";

export const Ticket = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/tickets/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TTicket,
    AxiosError,
    [string, string]
  >(["get-/api/tickets", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/tickets"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TTicket, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/tickets"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//tickets");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TTicket, AxiosError, TicketUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/tickets"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: TicketUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.id);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(() => pick(data, ["isFinished"]), [data]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Ticket"} ${
                  data?.id && data?.id.length ? data.id : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <ToggleField label="isFinished" name="isFinished" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
