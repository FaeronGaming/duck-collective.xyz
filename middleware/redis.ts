import { VercelRequest, VercelResponse } from '@vercel/node';
import redis, {RedisClient} from 'redis';

type ApiHandlerWithRedis = (req: VercelRequest, res: VercelResponse, redis: RedisClient) => Promise<void>;

export const withRedis = (handler: ApiHandlerWithRedis) => async (req: VercelRequest, res: VercelResponse) => {
  const client = redis.createClient({
    url: process.env.REDIS_URL
  });

  await handler(req, res, client);

  client.quit();
};

export async function useRedis<T>(cb: (client: RedisClient) => Promise<T>) {
  const client = redis.createClient({
    url: process.env.REDIS_URL
  });

  try {
    const data = await cb(client);
    client.quit();
    return data;
  } catch {
    client.end();
  }
}
