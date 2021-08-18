import { VercelRequest, VercelResponse } from '@vercel/node'
import { useRedis } from "../../../middleware/redis";
import { getAccessToken } from "../../../twitch/getAccessToken";
import { clearCachedStreams, getCachedStreams, setCachedStreams, watchedStreams } from '../../../twitch/getActiveStreams';

export default async function getActiveStreams(req: VercelRequest, res: VercelResponse): Promise<void> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const streams = await useRedis(async client => {
    // await clearCachedStreams(client);
    const cachedStreams = await getCachedStreams(client);
    if (cachedStreams !== null) {
      return cachedStreams;
    }
    const accessToken = await getAccessToken(client);
    return await setCachedStreams(client, accessToken, watchedStreams);
  });
  res.json({ streams });
}
