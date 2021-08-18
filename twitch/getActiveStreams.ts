import querystring from 'querystring';
import { RedisClient } from 'redis';

type User = { user_name: string; };
type StreamsResponse = { data: User[]; };

const cachedActiveStreamsKey = 'twitch_active_streams';

export const watchedStreams = ['santa_fae', 'bloodkaosv', 'mitzy_nyan', 'asmongold'];

export async function getActiveStreams(accessToken: string, user_login: string[]): Promise<string[]> {
  const params = querystring.stringify({ user_login });
  try {
    const response = await fetch(`https://api.twitch.tv/helix/streams?${params}`, {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Unable to pull active streams');
    };

    const activeStreams = await response.json() as unknown as StreamsResponse;
    return activeStreams.data.map(user => user.user_name);
  } catch (e) {
    throw e;
  }
}

export async function getCachedStreams(client: RedisClient): Promise<null | string[]> {
  return new Promise((resolve, reject) => {
    client.get(cachedActiveStreamsKey, (error, streams) => {
      !streams
        ? resolve(null)
        : resolve(JSON.parse(streams));
    });
  });
}

export async function setCachedStreams(client: RedisClient, accessToken: string, user_login: string[]): Promise<string[]> {
  const activeStreams = await getActiveStreams(accessToken, user_login);
  return new Promise(async (resolve, reject) => {
    client.set(cachedActiveStreamsKey, JSON.stringify(activeStreams), (err, reply) => {
      resolve(activeStreams);
    });
  });
}

export function clearCachedStreams(client: RedisClient) {
  return new Promise((resolve, reject) => {
    client.del(cachedActiveStreamsKey, (error, reply) => {
      resolve(null);
    })
  })
}
