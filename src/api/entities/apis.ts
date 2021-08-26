import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Organizations from "./organizations";
import Users from "./users";
import StarredApis from "./starredApis";

@Index("apis_pkey", ["id"], { unique: true })
@Entity("apis", { schema: "public" })
export default class Apis {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  public id: string;

  @Column("character varying", { name: "name" })
  public name: string;

  @Column("character varying", { name: "description" })
  public description: string;

  @Column("character varying", { name: "subtext" })
  public subtext: string;

  @Column("character varying", { name: "icon" })
  public icon: string;

  @Column("boolean", { name: "visible", nullable: true, default: () => "true" })
  public visible: boolean | null;

  @ManyToOne(() => Organizations, (organizations) => organizations.apis)
  @JoinColumn([{ name: "fk_organization_id", referencedColumnName: "id" }])
  public organization: Partial<Organizations>;

  @ManyToOne(() => Users, (users) => users.apis)
  @JoinColumn([{ name: "fk_owner_id", referencedColumnName: "id" }])
  public owner: Partial<Users>;

  @OneToMany(() => StarredApis, (starredApis) => starredApis.api)
  public starredApis: Partial<StarredApis>[];
}
