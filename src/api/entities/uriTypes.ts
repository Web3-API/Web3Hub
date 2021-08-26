import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import ApiUris from "./apiUris";

@Index("uri_types_pkey", ["id"], { unique: true })
@Index("uri_types_name_key", ["name"], { unique: true })
@Entity("uri_types", { schema: "public" })
export default class UriTypes {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  public id: string;

  @Column("character varying", { name: "name", unique: true })
  public name: string;

  @Column("character varying", { name: "type" })
  public type: string;

  @OneToMany(() => ApiUris, (apiUris) => apiUris.uriType)
  public apiUrises: Partial<ApiUris>[];
}
