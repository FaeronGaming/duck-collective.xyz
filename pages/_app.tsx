import { Grommet, Header, Menu, Main } from 'grommet';
import {Menu as MenuIcon} from 'grommet-icons';
import {createGlobalStyle} from 'styled-components';
import theme from '../theme.json';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <Grommet theme={theme}>
      <GlobalStyle />
      <Header background="brand" flex>
        <Menu icon={<MenuIcon />} items={[{label: 'Home', href: '/'}]} />
      </Header>
      <Main>
        <Component {...pageProps} />
      </Main>
    </Grommet>
  );
}

export default MyApp
