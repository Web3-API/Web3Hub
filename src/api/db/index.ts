import * as pgLib from "pg-promise";

// Inspired from: https://stackoverflow.com/questions/34382796/where-should-i-initialize-pg-promise
interface IDatabaseScope {
  db: pgLib.IDatabase<any>; // eslint-disable-line
  pgp: pgLib.IMain;
}

const pgp = pgLib.default();

export function getDB(): IDatabaseScope {
  return createSingleton<IDatabaseScope>("hub", () => {
    return {
      db: pgp({
        connectionString:
          process.env.DATABASE_URL ||
          "postgresql://postgres:postgres@127.0.0.1:5432/web3hub",
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      pgp,
    };
  });
}

// generic singleton creator:
export function createSingleton<T>(name: string, create: () => T): T {
  const s = Symbol.for(name);
  let scope = (global as any)[s]; // eslint-disable-line
  if (!scope) {
    scope = { ...create() };
    (global as any)[s] = scope; // eslint-disable-line
  }
  return scope;
}
