import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import UriTypes from "./uriTypes";

@Index("api_uris_pkey", ["id"], { unique: true })
@Entity("api_uris", { schema: "public" })
export default class ApiUris {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  public id: string;

  @Column("character varying", { name: "uri" })
  public uri: string;

  @Column("bigint", { name: "fk_api_id" })
  public apiId: string;

  @ManyToOne(() => UriTypes, (uriTypes) => uriTypes.apiUrises)
  @JoinColumn([{ name: "fk_uri_type_id", referencedColumnName: "id" }])
  public uriType: Partial<UriTypes>;
}
