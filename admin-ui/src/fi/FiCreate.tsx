import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const FiCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <div />
        <TextInput label="link" source="link" />
      </SimpleForm>
    </Create>
  );
};
