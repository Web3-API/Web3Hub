import { getDB } from "../db";

const { db } = getDB();

export class Organization {
  public static async get(_: number) {
    const connection = await db.connect();
    try {
      const organization = await connection.oneOrNone("");
      return organization;
    } catch (e) {
      console.log("Error on method: Organization.get() -> ", e.message);
      throw new Error(e);
    } finally {
      connection.done();
    }
  }
}
