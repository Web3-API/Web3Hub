import {EntityRepository, Repository} from 'typeorm';
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

	public async getAllActiveCount(): Promise<number> {
		return this.createQueryBuilder('apis')
			.where('visible = true')
			.getCount();
	}

  
	public async getAllActive(limit = 10, page = 1): Promise<ApiData[]> {
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
			WHERE visible = true
			GROUP BY apis.id, uri_types.type, api_uris.uri`,
		);

		return data.reduce(Api.sanitizeApis, []);
	}
}
