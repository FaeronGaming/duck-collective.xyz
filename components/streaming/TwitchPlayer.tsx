import {Box} from 'grommet';

type TwitchPlayerProps = { name: string; };

export function TwitchPlayer({ name }: TwitchPlayerProps) {
  return (
    <Box align="center">
      <iframe
        src={`https://player.twitch.tv/?${name}&parent=www.duck-collective.xyz`}
        height="300"
        width="400"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
      />
    </Box>
  );
}
