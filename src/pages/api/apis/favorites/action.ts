import { VercelRequest, VercelResponse } from '@vercel/node'
import { getConnection } from 'typeorm'
import { Api } from '../../../../api/models/Api'
import StarredApiRepository from '../../../../api/repositories/starredApiRepository'
import UserRepository from '../../../../api/repositories/userRepository'

const md5 = require('md5')

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === 'POST') {
    try {
      const userRepository = getConnection().getCustomRepository(UserRepository);
      const starredApiRepository = getConnection().getCustomRepository(StarredApiRepository);

      const didHash = md5(request.body.userDid)
      const user = await userRepository.findById(didHash);
      if (!user) {
        return response.json({ status: 406 });
      }

      const isFavorite = await starredApiRepository.isFavorite(user.id, request.body.apiId)
      const action = isFavorite ? 'unfavorite' : 'favorite'

      if (isFavorite) {
        await starredApiRepository.unfavorite(user.id, request.body.apiId);
      } else {
        await starredApiRepository.favorite(user.id, request.body.apiId);
      }

      return response.json({
        status: 200,
      })
    } catch (error) {
      console.log(error)
      return response.json({ status: 500, error: error.message })
    }
  }
}
