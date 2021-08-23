import { Api } from "../../../../api/models/Api";
import { User } from "../../../../api/models/User";

import { VercelRequest, VercelResponse } from "@vercel/node";

const md5 = require("md5"); // eslint-disable-line

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "POST") {
    try {
      const didHash = md5(request.body.userDid);
      const user = await User.find(didHash);
      if (!user) return response.json({ status: 406 });

      const isFavorite = await Api.isFavorite(user.id, request.body.apiId);
      const action = isFavorite ? "unfavorite" : "favorite";
      await Api[action](user.id, request.body.apiId);

      return response.json({
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return response.json({ status: 500, error: error.message });
    }
  }
};
