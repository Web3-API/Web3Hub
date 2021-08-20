import { Api } from "../../../../api/models/Api";

import { VercelRequest, VercelResponse } from "@vercel/node";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const appId: string | undefined = request.query.appId as string;

      if (!appId) {
        return response.json({
          status: 400,
          message: "Attribute appId not found in request query",
        });
      }

      const data = await Api.getFavorites(appId);
      const count = await Api.getFavoritesCount(appId);

      return response.json({
        status: 200,
        data,
        count,
      });
    } catch (error) {
      return response.json({ status: 500, error: error.message });
    }
  }
};
