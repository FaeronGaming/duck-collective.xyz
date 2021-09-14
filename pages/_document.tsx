import { DocumentContext } from "next/dist/shared/lib/utils";
import NextDocument from 'next/document';
import {ServerStyleSheet} from 'styled-components';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<{
    styles: JSX.Element;
    html: string;
    head?: JSX.Element[];
  }> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () => {
        return originalRenderPage({
          // eslint-ignore-next-line react/display-name
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      };
      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
