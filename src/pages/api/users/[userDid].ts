import { User } from "../../../api/models/User";

import { VercelRequest, VercelResponse } from "@vercel/node";

const md5 = require("md5"); // eslint-disable-line

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const { userDid } = request.query;
      if (!userDid) {
        return response.json({
          status: 400,
          message: "Attribute userDid not found in request query",
        });
      }

      const id = md5(userDid);
      const apis = await User.getPublishedApis(id);
      return response.json({
        status: 200,
        apis,
      });
    } catch (error) {
      return response.json({ status: 500, error: error.message });
    }
  }
};
