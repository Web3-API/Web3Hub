import {EntityRepository, Repository} from 'typeorm';
import Organizations from '../entities/organizations';

@EntityRepository(Organizations)
export default class OrganizationRepository extends Repository<Organizations> {

	public getById(id: number): Promise<Organizations> {
		return this.findOne({
			where: {
				id,
			},
		});
	}
}
