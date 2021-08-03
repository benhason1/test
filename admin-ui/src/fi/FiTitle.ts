import { Fi as TFi } from "../api/fi/Fi";

export const FI_TITLE_FIELD = "link";

export const FiTitle = (record: TFi) => {
  return record.link;
};
