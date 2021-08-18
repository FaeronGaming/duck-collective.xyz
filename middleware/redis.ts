import redis, {RedisClient} from 'redis';

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
