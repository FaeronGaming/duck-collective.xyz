import { Heading } from 'grommet'
import Head from 'next/head'
import { ReactNode } from 'react';
import useSWR, { SWRConfig } from 'swr';
import { NoOneOnline } from '../components/streaming/NoOneOnline'
import { TwitchPlayer } from '../components/streaming/TwitchPlayer';
import { useRedis } from '../middleware/redis';
import { getCachedStreams } from '../twitch/getActiveStreams';

type HomeProps = {
  streams: string[];
};

const ACTIVE_STREAMS_URL = '/api/streams/active';

export async function getServerSideProps(): Promise<{ props: HomeProps }> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const streams = await useRedis(async client => {
    return await getCachedStreams(client) || ([] as unknown as string[]);
  });

  return { 
    props: { streams }
  };
}

function DisplayStreams() {
  const {data} = useSWR<HomeProps>(ACTIVE_STREAMS_URL);

  if (!data.streams.length) {
    return <NoOneOnline />;
  }

  return (
    <>
      {data.streams.map(name => (
        <TwitchPlayer name={name} key={name} />
      ))}
    </>
  );
}

export default function Home({ streams }: HomeProps) {
  return (
    <SWRConfig value={{
      fallback: {
        [ACTIVE_STREAMS_URL]: { streams }
      }
    }}>
      <Head>
        <title>We Are The Duck Collection</title>
        <meta name="description" content="Just a collection of ducks and a cat or two" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading margin="medium" alignSelf="center" textAlign="center">We Are The Duck Collective</Heading>
      <Heading level="2" alignSelf="center">Pardon our dust as we setup</Heading>

      <DisplayStreams />
    </SWRConfig>
  )
}
