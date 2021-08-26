import { VercelRequest, VercelResponse } from '@vercel/node'
import { getConnection } from 'typeorm'
import UserRepository from '../../../api/repositories/userRepository';

const md5 = require("md5");

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === 'POST') {
    const { did } = request.body;
    const hashedDid = md5(did);
    try {
      const userRepository = getConnection().getCustomRepository(UserRepository);
      await userRepository.findOrCreate(hashedDid);
      return response.json({
        status: 200,
      });
    } catch (error) {
      response.json({
        status: 500,
        error: error.message,
      });
    }
  }
}
