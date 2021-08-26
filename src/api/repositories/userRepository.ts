import {EntityRepository, Repository} from 'typeorm';
import StarredApis from '../entities/starredApis';
import User from '../entities/users';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

	public async findOrCreate(id: string): Promise<User> {
		const obj = await this.createQueryBuilder()
			.insert()
			.into(User)
			.values({
				id,
			})
			.orIgnore()
			.returning('*')
			.execute();

		return obj.raw;
	  }
	
	  public async findById(id: string): Promise<User> {
		return this.findOne(id);
	  }

	  public findByName(name: string): Promise<User> {
		return this.findOne({
			where: {
				name,
			},
		});
	}
}
