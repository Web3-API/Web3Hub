import { VercelRequest } from '@vercel/node'
import { getCustomRepository } from 'typeorm'
import Database from '../db'
import { Api } from '../../../api/models/Api'
import { ApiData } from '../../../api/models/types'
import ApiRepository from '../../../api/repositories/apiRepository'
import { checkContentIsValid } from '../../../api/services/ens'

export default async (request: VercelRequest) => {
  if (request.method === 'POST') {
    try {
      const database = new Database();
      await database.connect();

      const apis = await getCustomRepository(ApiRepository).getAllActive();

      apis.forEach(async (api: ApiData) => {
        const { valid } = await checkContentIsValid(api.pointerUris, api.locationUri)
        if (!valid) Api.deactivate(api.id)
      })
    } catch (e) {
      console.log('Error when checking and updating apis -> ', e.message)
    }
  }
}
