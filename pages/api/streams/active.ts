import { VercelRequest, VercelResponse } from '@vercel/node'
import { RedisClient } from 'redis';
import { withRedis } from "../../../middleware/redis";
import { getAccessToken } from "../../../twitch/getAccessToken";
import { getCachedStreams, setCachedStreams, watchedStreams } from '../../../twitch/getActiveStreams';

async function getActiveStreams(req: VercelRequest, res: VercelResponse, client: RedisClient): Promise<void> {
  let streams = await getCachedStreams(client);
  if (streams === null) {
    const accessToken = await getAccessToken(client);
    streams = await setCachedStreams(client, accessToken, watchedStreams);
  }

  res.json({ streams });
}

export default withRedis(getActiveStreams);
