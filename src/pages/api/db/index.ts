import 'reflect-metadata';
import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm';

declare var require: any;
const context = require.context('../../../api/entities', true, /\.ts$/);
const entityFileNames = context.keys();

const original = (Connection.prototype as any).findMetadata;
(Connection.prototype as any).findMetadata = function findMetadata(target: any) {
  const result = original.call(this, target);
  if (result) {
    return result;
  }

  if (typeof target === 'function') {
    return this.entityMetadatas.find(
      (metadata: any) => metadata.name === target.name
    );
  }
};

export default class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async connect(name = 'default'): Promise<Connection> {
    const CONNECTION_NAME: string = name;
    let connection: Connection;
    const hasConnection = this.connectionManager.has(CONNECTION_NAME);
    if (hasConnection) {
      connection = this.connectionManager.get(CONNECTION_NAME);
      if (connection.isConnected) {
        return connection;
      }
        
      return await connection.connect();
    }

    const connectionOptions: ConnectionOptions = {
        name: 'default',
        type: process.env.TYPEORM_CONNECTION as any,
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        synchronize: false, // process.env.TYPEORM_SYNCHRONIZE as any,
        logging: process.env.TYPEORM_LOGGING as string === 'true',
        entities: entityFileNames.map((file : any) => context(file).default),
        migrations: undefined, // [process.env.TYPEORM_MIGRATIONS as string],
        ssl: true,
    };

    console.log(connectionOptions);
    return await createConnection(connectionOptions);
  }
}
