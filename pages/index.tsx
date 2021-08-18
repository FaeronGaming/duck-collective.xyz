import { Heading } from 'grommet'
import Head from 'next/head'
import { ReactNode } from 'react';
import useSWR from 'swr';
import { NoOneOnline } from '../components/streaming/NoOneOnline'
import { TwitchPlayer } from '../components/streaming/TwitchPlayer';
import { useRedis } from '../middleware/redis';
import { getCachedStreams } from '../twitch/getActiveStreams';

type HomeProps = {
  streams: string[];
};

const fetcher = (route: string) => fetch(route).then(res => res.json());

export async function getServerSideProps(): Promise<{ props: HomeProps }> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const streams = await useRedis(async client => {
    return await getCachedStreams(client) || ([] as unknown as string[]);
  });

  return { 
    props: { streams }
  };
}

export default function Home({ streams }: HomeProps) {
  const {data, isValidating} = useSWR<HomeProps>('/api/streams/active', fetcher, { initialData: {streams} });

  let displayedStreams: ReactNode = <NoOneOnline />;
  if (data.streams.length) {
    displayedStreams = data.streams.map(name =>(
      <TwitchPlayer name={name} key={name} />
    ));
  }
  return (
    <>
      <Head>
        <title>We Are The Duck Collection</title>
        <meta name="description" content="Just a collection of ducks and a cat or two" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading margin="medium" alignSelf="center" textAlign="center">We Are The Duck Collective</Heading>
      <Heading level="2" alignSelf="center">Pardon our dust as we setup</Heading>

      { displayedStreams }
    </>
  )
}
