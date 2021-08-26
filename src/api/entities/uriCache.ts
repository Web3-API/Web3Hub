import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uri_cache_pkey", ["id"], { unique: true })
@Entity("uri_cache", { schema: "public" })
export default class URICache {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  public id: string;

  @Column("character varying", { name: "uri" })
  public uri: string;

  @Column("character varying", { name: "ipfs" })
  public ipfs: string;

  @Column('timestamp without time zone',{
		nullable:false,
		default: () => 'now()',
		name:'last_updated'
	})
	public lastUpdated: Date;
}
