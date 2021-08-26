import { getConnection } from 'typeorm'

export enum AddressesTypes {
  ETHEREUM = 1,
}

export class User {

  public static async getFavorites(userId: string) {
    return await getConnection().createQueryRunner().query(
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
      [userId],
    )
  }

  public static async getPublishedApis(userId: string) {
    return await getConnection().createQueryRunner().query(
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
      [userId],
    )
  }
}
