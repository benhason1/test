import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const FiEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <div />
        <TextInput label="link" source="link" />
      </SimpleForm>
    </Edit>
  );
};
