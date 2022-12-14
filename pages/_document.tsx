import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/icon.png' ></link>
          <meta name='theme-color' content='#fff'/>
        </head>

        <Head/>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
