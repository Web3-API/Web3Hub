/* eslint-disable */
// This file will be removed

import { getDB } from "../db";
import { ApiData } from "./types";

import pgPromise from "pg-promise";

export enum Authorities {
  ENS = 1,
  IPFS,
}

const { db } = getDB();
export class Api {
  public static async create(apiInfo: ApiData) {
    const connection = await db.connect();
    try {
      const {
        name,
        subtext,
        description,
        icon,
        locationUri,
        pointerUris,
        ownerId,
      } = apiInfo;
      const insertApi = async (tx: pgPromise.ITask<{}>) => {
        const api = await tx.one(
          "INSERT INTO apis (name, subtext, description, icon, fk_owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [name, subtext, description, icon, ownerId]
        );

        //@TODO: Retrieve authId dynamically
        await tx.none(
          "INSERT INTO api_uris (uri, fk_api_id, fk_uri_type_id) VALUES ($1, $2, $3)",
          [locationUri, api.id, Authorities.IPFS]
        );

        const insertPointers = async (locationUri: string) => {
          await tx.none(
            "INSERT INTO api_uris (uri, fk_api_id, fk_uri_type_id) VALUES ($1, $2, $3)",
            [locationUri, api.id, Authorities.ENS]
          );
        };

        pointerUris.map(insertPointers);
      };

      await connection.tx(insertApi);
      return {
        name,
        subtext,
        description,
        icon,
        locationUri,
        pointerUris,
      };
    } catch (error) {
      console.log("Error on method: Api.create() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async getAllActive(): Promise<ApiData[]> {
    const con = await db.connect();
    try {
      const apis = await con.manyOrNone(
        `SELECT 
          apis.id, 
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
        WHERE visible = true
        GROUP BY apis.id, uri_types.type, api_uris.uri`
      );
      return apis.reduce(this.sanitizeApis, []);
    } catch (error) {
      console.log("Error on method: Api.getAllActive() -> ", error.message);
      throw new Error(error);
    } finally {
      con.done();
    }
  }

  public static async deactivate(id: number) {
    const connection = await db.connect();
    try {
      await connection.none("UPDATE apis SET visible = false WHERE id = $1", [
        id,
      ]);
    } catch (error) {
      console.log("Error on method: Api.deactivate() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async get(name: string, visible = true) {
    const connection = await db.connect();
    try {
      const apisData = await connection.manyOrNone(
        `SELECT apis.id, 
          apis.description, 
          apis.name, 
          apis.subtext,
          apis.icon, 
          uri_types.type as type, 
          api_uris.uri FROM apis 
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id 
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id 
        WHERE LOWER(apis.name) LIKE $1 AND apis.visible = $2`,
        [`%${name}%`, visible]
      );

      if (!apisData.length) return null;

      const apis = apisData.reduce(this.sanitizeApis, []);

      return apis;
    } catch (error) {
      console.log("Error on method: Api.get() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async getByLocation(location: string, name: string) {
    const connection = await db.connect();
    try {
      const api = await connection.oneOrNone(
        `SELECT apis.id FROM apis
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id
        WHERE api_uris.uri = $1 AND LOWER(uri_types.name) = $2`,
        [name, location]
      );

      if (!api) return null;

      const apisData = await connection.manyOrNone(
        `SELECT
          apis.id,
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
        WHERE api_uris.fk_api_id = $1
        GROUP BY apis.id, uri_types.type, api_uris.uri`,
        [api.id]
      );

      if (!apisData.length) return null;

      const apiSanitized = apisData.reduce(this.sanitizeApis, []);
      return apiSanitized[0];
    } catch (error) {
      console.log("Error on method: Api.getByLocation() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async getByOwner(id: string) {
    const connection = await db.connect();
    try {
      const user = await connection.oneOrNone(
        `SELECT * FROM users WHERE id = $1`,
        [id]
      );

      if (!user) return null;

      const apisData = await connection.manyOrNone(
        `SELECT apis.id, 
            apis.description, 
            apis.name, 
            apis.subtext,
            apis.icon, 
            uri_types.type as type, 
            api_uris.uri FROM apis 
          INNER JOIN api_uris ON apis.id = api_uris.fk_api_id 
          INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id 
          WHERE apis.fk_owner_id = $1`,
        [id]
      );

      if (!apisData.length) return null;

      const apisSanitized = apisData.reduce(this.sanitizeApis, []);
      return apisSanitized;
    } catch (error) {
      console.log("Error on method: Api.getByLocation() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async getFavorites(apiId: string) {
    const connection = await db.connect();
    try {
      const apisData = await connection.manyOrNone(
        `SELECT apis.id, 
        apis.description, 
        apis.name, 
        apis.subtext,
        apis.icon, 
        uri_types.type as type, 
        api_uris.uri FROM apis 
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id 
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id 
        INNER JOIN starred_apis ON apis.id = starred_apis.fk_api_id
        WHERE starred_apis.fk_api_id = $1`,
        [apiId]
      );
      if (!apisData.length) return null;

      const apisSanitized = apisData.reduce(this.sanitizeApis, []);
      return apisSanitized;
    } catch (error) {
      console.log("Error on method: Api.getFavorites() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async getFavoritesCount(apiId: string) {
    const connection = await db.connect();
    try {
      const apiFavoritesCount = await connection.oneOrNone(
        `SELECT COUNT(*) FROM starred_apis WHERE fk_api_id = $1`,
        [apiId]
      );
      return apiFavoritesCount;
    } catch (error) {
      console.log(
        "Error on method: Api.getFavoritesCount() -> ",
        error.message
      );
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async isFavorite(userId: string, apiId: string) {
    const connection = await db.connect();
    try {
      const favoriteApi = await connection.oneOrNone(
        `SELECT * FROM  starred_apis WHERE fk_user_id = $1 AND fk_api_id = $2`,
        [userId, apiId]
      );

      return !!favoriteApi;
    } catch (error) {
      console.log("Error on method: Api.isFavorite() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async favorite(userId: string, apiId: string) {
    const connection = await db.connect();
    try {
      await connection.oneOrNone(
        `INSERT INTO starred_apis (fk_user_id, fk_api_id) VALUES ($1, $2) RETURNING id`,
        [userId, apiId]
      );
    } catch (error) {
      console.log("Error on method: Api.favorite() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async unfavorite(userId: string, apiId: string) {
    const connection = await db.connect();
    try {
      await connection.oneOrNone(
        `DELETE FROM starred_apis WHERE fk_user_id = $1 AND fk_api_id = $2`,
        [userId, apiId]
      );
    } catch (error) {
      console.log("Error on method: Api.unfavorite() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static sanitizeApis(acc: ApiData[], api: any): ApiData[] {
    const { authority, type, uri, name, ...metadata } = api;

    const apiIndex = acc.findIndex(({ name }) => name === api.name);

    const apiSanitized = {
      ...metadata,
      name,
      pointerUris: [],
      ...(acc[apiIndex] || {}),
    };

    if (api.type === "storage") {
      apiSanitized.locationUri = api.uri;
    } else {
      apiSanitized.pointerUris.push(api.uri);
    }

    if (apiIndex === -1) return [...acc, apiSanitized];
    acc[apiIndex] = apiSanitized;

    return acc;
  }
}
