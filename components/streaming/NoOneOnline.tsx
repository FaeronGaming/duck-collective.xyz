import Image from 'next/image';
import styled from 'styled-components';
import { Box } from 'grommet';
import intermission from './intermission.png';

const Wrapper = styled(Box)`
  max-width: 720px;
  position: relative;
  text-align: center;
`;

const CenteredText = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 30px;
  left: 50%;
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export function NoOneOnline() {
  return (
    <Wrapper alignSelf="center">
      <Image src={intermission} alt="no streams are online" />
      <CenteredText>{`Huh, No One's Online`}</CenteredText>
    </Wrapper>
  );
}
