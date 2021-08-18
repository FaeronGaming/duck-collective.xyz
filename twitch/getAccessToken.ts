import { RedisClient } from "redis";

type AccessTokenResponse = { access_token: string; };

export async function getNewAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_SECRET,
    grant_type: 'client_credentials',
    scope: 'user:read:email',
  });
  try {
    const response = await fetch(`https://id.twitch.tv/oauth2/token?${params}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Unable to get access token');
    }

    const data = await response.json() as unknown as AccessTokenResponse;
    return data.access_token;
  } catch (e) {
    throw e;
  }
}

export function getAccessToken(redis: RedisClient): Promise<string> {
  const accessTokenKey = 'twitch_access_token';
  return new Promise((resolve, reject) => {
    redis.get(accessTokenKey, async (error, token) => {
      if (!token) {
        const newToken = await getNewAccessToken();
        redis.set(accessTokenKey, newToken);
        return resolve(newToken);
      }
      console.log(`using existing access token ${token}`);
      resolve(token);
    });
  });
}
