import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  ToggleField,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Ticket } from "../api/ticket/Ticket";
import { TicketCreateInput } from "../api/ticket/TicketCreateInput";

const INITIAL_VALUES = {} as TicketCreateInput;

export const CreateTicket = (): React.ReactElement => {
  useBreadcrumbs("/tickets/new", "Create Ticket");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Ticket,
    AxiosError,
    TicketCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/tickets", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/tickets"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: TicketCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Ticket"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <ToggleField label="isFinished" name="isFinished" />
          </div>
          <div>
            <TextField label="name" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
