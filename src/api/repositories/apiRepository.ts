import { EntityRepository, Repository } from 'typeorm';
import Apis from '../entities/apis';
import { ApiData } from '../models/types';
import { Api } from '../models/Api';

@EntityRepository(Apis)
export default class ApiRepository extends Repository<Apis> {

	public findByName(name: string): Promise<Apis | undefined> {
		return this.findOne({
			where: {
				name,
			},
		});
	}

	public async searchCount(search: string): Promise<number> {
		const query = this.createQueryBuilder('apis')
			.where('visible = true');

		if (search && search.length > 2) {
			query.where(
				'(apis.name ILIKE :search or apis.description ILIKE :search)',
				{ search: `%${search}%` }
			)
		}

		return query.getCount();
	}


	public async search(limit = 10, page = 1, search?: string): Promise<ApiData[]> {
		const searchQueary = (search && search.length > 2) ? `and (apis.name ILIKE $1 or apis.description ILIKE $1)` : ''
		const data = await this.query(
			`SELECT 
				apis.id, 
				apis.description, 
				apis.name, 
				apis.subtext,
				apis.icon, 
				uri_types.type as type, 
				api_uris.uri,
				COUNT(starred_apis.fk_api_id) as favorites
			FROM apis 
			INNER JOIN api_uris ON apis.id = api_uris.fk_api_id 
			INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id 
			FULL OUTER JOIN starred_apis ON apis.id = starred_apis.fk_api_id
			WHERE visible = true ${searchQueary}
			GROUP BY apis.id, uri_types.type, api_uris.uri`,
			[`%${search}%`]
		);

		return data.reduce(Api.sanitizeApis, []);
	}
}
