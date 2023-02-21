import Head from 'next/head';
import { Roboto_Flex } from '@next/font/google';

const roboto = Roboto_Flex({ subsets: ['latin-ext'] });

interface MetaProps {
  title?: string;
  keywords?: string;
  description?: string;
  robots?: string;
  imageDescription?: string;
}

function Meta({
  title,
  keywords,
  description,
  robots,
  imageDescription
}: MetaProps) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} key="keywords" />
      <meta name="description" content={description} key="description" />
      <meta name="robots" content={robots} key="robots" />
      <meta name="google" content="notranslate" key="notranslate" />
      <meta charSet="utf-8" />

      <title>{title}</title>

      {/* Facebook Meta Tags */}
      <meta property="og:url" content="https://snipshot.dev/" />
      <meta
        property="og:image"
        content="https://snipshot.dev/meta_image.png/"
      />
      <meta property="og:image:alt" content={imageDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="snipshot.dev" />
      <meta property="twitter:url" content="https://snipshot.dev/" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://snipshot.dev/meta_image.png/"
      />

      {/* Roboto font */}
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
    </Head>
  );
}

Meta.defaultProps = {
  title: 'snipshot - Code snippets for your inspiration',
  keywords: 'development, programming, snippets, code, samples',
  description:
    'Explore and share code snippets for your favorite programming language. Insights are gained on shipshot.',
  imageDescription: 'snipshot.dev website description',
  robots: 'index,follow'
};

export default Meta;
