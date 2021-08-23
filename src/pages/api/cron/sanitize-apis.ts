import { Api } from "../../../api/models/Api";
import { ApiData } from "../../../api/models/types";
import { checkContentIsValid } from "../../../api/services/ens";

import { VercelRequest } from "@vercel/node";

export default async (request: VercelRequest) => {
  if (request.method === "POST") {
    try {
      const apis = await Api.getAllActive();

      apis.forEach(async (api: ApiData) => {
        const { valid } = await checkContentIsValid(
          api.pointerUris,
          api.locationUri
        );
        if (!valid) {
          await Api.deactivate(api.id);
        }
      });
    } catch (e) {
      console.log("Error when checking and updating apis -> ", e.message);
    }
  }
};
