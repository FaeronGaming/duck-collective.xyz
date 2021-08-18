import { VercelRequest, VercelResponse } from "@vercel/node";
import { RedisClient } from "redis";
import { withRedis } from "../../../middleware/redis";
import { clearCachedStreams } from "../../../twitch/getActiveStreams";

async function clearStreamsCache(req: VercelRequest, res: VercelResponse, client: RedisClient): Promise<void> {
  await clearCachedStreams(client);
  res.status(200);
}

export default withRedis(clearStreamsCache);
