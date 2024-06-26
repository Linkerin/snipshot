import Head from 'next/head';

interface MetaProps {
  title?: string;
  keywords?: string;
  description?: string;
  robots?: string;
  ogUrl?: string;
  imageDescription?: string;
  imageUrl?: string;
  canonicalLink?: string;
}

function Meta({
  title,
  keywords,
  description,
  robots,
  ogUrl,
  imageDescription,
  imageUrl,
  canonicalLink
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
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="snipshot.dev" />
      <meta property="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {!!canonicalLink && <link rel="canonical" href={canonicalLink} />}
    </Head>
  );
}

Meta.defaultProps = {
  title: 'snipshot – code snippets for your inspiration',
  keywords: 'development, programming, snippets, code, samples',
  description:
    'Explore and share code snippets for your favorite programming language. Insights are gained on shipshot.',
  ogUrl: 'https://snipshot.dev/',
  imageDescription: 'snipshot.dev Open Graph image',
  imageUrl: 'https://snipshot.dev/meta_image.png/',
  robots: 'index,follow'
};

export default Meta;
