import { Api } from "./Api";
import { getDB } from "../db";

export enum AddressesTypes {
  ETHEREUM = 1,
}

const { db } = getDB();

export class User {
  public static async findOrCreate(did: string) {
    const connection = await db.connect();
    try {
      await connection.oneOrNone(
        "INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING RETURNING *",
        [did]
      );
    } catch (error) {
      console.log("Error on method: User.findOrCreate() -> ", error.message);
      throw new Error(error);
    }
  }

  public static async find(did: string) {
    const connection = await db.connect();
    try {
      return await connection.oneOrNone("SELECT * FROM users WHERE id = $1", [
        did,
      ]);
    } catch (error) {
      console.log("Error on method: User.find() -> ", error.message);
      throw new Error(error);
    }
  }

  public static async getFavoritesCount(userId: string) {
    const connection = await db.connect();
    try {
      const userFavoritesCount = await connection.oneOrNone(
        `SELECT COUNT(*) FROM starred_apis WHERE fk_user_id = $1`,
        [userId]
      );
      return userFavoritesCount;
    } catch (error) {
      console.log(
        "Error on method: Api.getUserFavoritesCount() -> ",
        error.message
      );
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async getFavorites(userId: string) {
    const connection = await db.connect();
    try {
      const apisData = await connection.manyOrNone(
        `SELECT apis.id,
        apis.description,
        apis.name,
        apis.subtext,
        apis.icon,
        uri_types.type as type,
        api_uris.uri,
        COUNT(starred_apis.fk_api_id) as favorites
        FROM apis
        FULL OUTER JOIN starred_apis on apis.id = starred_apis.fk_api_id
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id
        WHERE starred_apis.fk_user_id = $1
        GROUP BY apis.id, uri_types.type, api_uris.uri`,
        [userId]
      );
      if (!apisData.length) return [];

      const apisSanitized = apisData.reduce(Api.sanitizeApis, []);
      return apisSanitized;
    } catch (error) {
      console.log("Error on method: User.getFavorites() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async getPublishedApis(userId: string) {
    const connection = await db.connect();
    try {
      const apisData = await connection.manyOrNone(
        `SELECT apis.id,
          apis.description,
          apis.name,
          apis.subtext,
          apis.icon,
          uri_types.type as type,
          api_uris.uri,
          COUNT(starred_apis.fk_api_id) as favorites
        FROM apis
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id
        FULL OUTER JOIN starred_apis ON apis.id = starred_apis.fk_api_id
        WHERE apis.fk_owner_id = $1
        GROUP BY apis.id, uri_types.type, api_uris.uri`,
        [userId]
      );
      if (!apisData.length) return [];

      const apisSanitized = apisData.reduce(Api.sanitizeApis, []);
      return apisSanitized;
    } catch (error) {
      console.log("Error on method: User.getPublishedApi() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }
}
