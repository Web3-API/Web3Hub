// https://swr.vercel.app/docs/data-fetching
import axios from "axios";
export const fetcherREST = (url: string): Promise<undefined> =>
  axios.get(url).then((res) => res.data);
// import { request } from "graphql-request";
// export const fetcherGQL = (query) => request('/api/graphql', query)
