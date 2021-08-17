import querystring from 'querystring';

type User = { user_name: string; };
type StreamsResponse = { data: User[]; };

export async function getActiveStreams(accessToken: string, user_login: string[]): Promise<string[]> {
  const params = querystring.stringify({ user_login });
  try {
    console.log(`https://api.twitch.tv/helix/streams?${params}`);
    const response = await fetch(`https://api.twitch.tv/helix/streams?${params}`, {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log(response)
    if (!response.ok) {
      throw new Error('Unable to pull active streams');
    };

    const activeStreams = await response.json() as unknown as StreamsResponse;
    return activeStreams.data.map(user => user.user_name);
  } catch (e) {
    throw e;
  }
}
