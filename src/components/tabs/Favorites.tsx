/** @jsxImportSource theme-ui **/

import { APIData } from "../../hooks/ens/useGetAPIfromENS";
import ApiGrid from "../ApiGrid";

interface PublishedProps {
  apis: APIData[];
}

const Published = ({ apis }: PublishedProps) => {
  return <ApiGrid apis={apis} />;
};

export default Published;
