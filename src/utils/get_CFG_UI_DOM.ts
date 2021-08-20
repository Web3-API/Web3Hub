import { cloudFlareGateway } from "../constants";

import axios from "axios";
import cheerio from "cheerio";

const cleaner = require("clean-html");

export default async function get_CFG_UI_DOM(api: any, path: string) {
  const response = await axios.get(
    `${cloudFlareGateway}${api.locationUri}${path}`
  );
  let siteURLHTMLClean = "";
  cleaner.clean(response.data, (html: string) => (siteURLHTMLClean = html));
  const $ = cheerio.load(siteURLHTMLClean);
  return $;
}
