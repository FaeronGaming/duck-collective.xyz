import { Heading } from 'grommet'
import Head from 'next/head'
import { NoOneOnline } from '../components/streaming/NoOneOnline'
import { TwitchPlayer } from '../components/streaming/TwitchPlayer';
import { getAccessToken } from '../twitch/getAccessToken'
import { getActiveStreams } from '../twitch/getActiveStreams';

type HomeProps = {
  activeStreams: string[];
}

export async function getServerSideProps(): Promise<{ props: HomeProps }> {
  const accessToken = await getAccessToken();
  const activeStreams = await getActiveStreams(accessToken, ['santa_fae', 'bloodkaosv', 'mitzy_nyan', 'SR_Kaif']);
  return { 
    props: { activeStreams }
  };
}

export default function Home({ activeStreams }: HomeProps) {
  return (
    <>
      <Head>
        <title>We Are The Duck Collection</title>
        <meta name="description" content="Just a collection of ducks and a cat or two" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading margin="medium" alignSelf="center" textAlign="center">We Are The Duck Collective</Heading>
      <Heading level="2" alignSelf="center">Pardon our dust as we setup</Heading>

      { !activeStreams.length && <NoOneOnline /> }
      { activeStreams.length && activeStreams.map(name => (
        <TwitchPlayer name={name} key={name} />
      ))}
    </>
  )
}
