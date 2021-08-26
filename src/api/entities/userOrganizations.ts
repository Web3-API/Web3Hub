import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Organizations from "./organizations";
import Users from "./users";

@Index("user_organizations_pkey", ["id"], { unique: true })
@Entity("user_organizations", { schema: "public" })
export default class UserOrganizations {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  public id: string;

  @ManyToOne(
    () => Organizations,
    (organizations) => organizations.userOrganizations
  )
  @JoinColumn([{ name: "fk_organization_id", referencedColumnName: "id" }])
  public organization: Partial<Organizations>;

  @ManyToOne(() => Users, (users) => users.userOrganizations)
  @JoinColumn([{ name: "fk_user_id", referencedColumnName: "id" }])
  public user: Partial<Users>;
}
