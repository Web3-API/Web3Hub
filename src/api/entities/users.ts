import { Column, Entity, Index, OneToMany } from "typeorm";
import Apis from "./apis";
import StarredApis from "./starredApis";
import UserOrganizations from "./userOrganizations";

@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export default class Users {
  @Column("character varying", { primary: true, name: "id" })
  public id: string;

  @OneToMany(() => Apis, (apis) => apis.owner)
  public apis: Partial<Apis>[];

  @OneToMany(() => StarredApis, (starredApis) => starredApis.user)
  public starredApis: Partial<StarredApis>[];

  @OneToMany(
    () => UserOrganizations,
    (userOrganizations) => userOrganizations.user
  )
  public userOrganizations: Partial<UserOrganizations>[];
}
