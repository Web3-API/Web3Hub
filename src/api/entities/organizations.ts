import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Apis from "./apis";
import UserOrganizations from "./userOrganizations";

@Index("organizations_pkey", ["id"], { unique: true })
@Entity("organizations", { schema: "public" })
export default class Organizations {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  public id: string;

  @Column("character varying", { name: "name" })
  public name: string;

  @Column("character varying", { name: "location", nullable: true })
  public location: string | null;

  @OneToMany(() => Apis, (apis) => apis.organization)
  public apis: Partial<Apis>[];

  @OneToMany(
    () => UserOrganizations,
    (userOrganizations) => userOrganizations.organization
  )
  public userOrganizations: Partial<UserOrganizations>[];
}
