import { VercelRequest, VercelResponse } from "@vercel/node";
import { useRedis } from "../../../middleware/redis";
import { clearCachedStreams } from "../../../twitch/getActiveStreams";

export default async function clearStreamsCache(req: VercelRequest, res: VercelResponse): Promise<void> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  await useRedis(async client => {
    clearCachedStreams(client);
  });
  res.status(200);
}
