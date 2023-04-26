import { GetServerSideProps } from 'next';
import { withAxiomGetServerSideProps } from 'next-axiom';

import { LANGS } from '@/services/constants';
import sitemapServices from '@/services/prisma/sitemapServices';

interface GenerateSiteMapParams {
  tags: string[];
  slugs: {
    slug: string | null;
    lang: string;
    updated: Date;
  }[];
  users: {
    name: string | null;
    updated: Date | null;
  }[];
}

function generateSiteMap({ tags, slugs, users }: GenerateSiteMapParams) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://snipshot.dev';

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${baseUrl}</loc>
       <lastmod>2023-04-26T08:28:45.868Z</lastmod>
       <changefreq>monthly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${baseUrl}/about</loc>
       <lastmod>2023-04-26T08:28:45.868Z</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${baseUrl}/add</loc>
       <lastmod>2023-04-26T08:28:45.868Z</lastmod>
       <changefreq>yearly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>${baseUrl}/login</loc>
       <lastmod>2023-04-26T08:28:45.868Z</lastmod>
       <changefreq>yearly</changefreq>
       <priority>0.7</priority>
     </url>
     ${LANGS.map(lang => {
       if (lang)
         return `
            <url>
              <loc>${baseUrl}/snippets/${encodeURIComponent(lang)}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>hourly</changefreq>
              <priority>1.0</priority>
            </url>
        `;
     }).join('')}
     ${slugs.map(slugObj => {
       if (slugObj.slug && slugObj.lang) {
         return `
            <url>
                <loc>${baseUrl}/snippets/${encodeURIComponent(
           slugObj.lang
         )}/${encodeURIComponent(slugObj.slug)}</loc>
                <lastmod>${slugObj.updated.toISOString()}</lastmod>
                <priority>0.9</priority>
            </url>
        `;
       }
     })}
     ${users.map(userObj => {
       if (userObj.name && userObj.updated) {
         const { name, updated } = userObj;
         return `
            <url>
              <loc>${baseUrl}/users/${encodeURIComponent(name)}</loc>
              <lastmod>${updated.toISOString()}</lastmod>
              <priority>0.8</priority>
            </url>
        `;
       }
     })}
     ${tags.map(
       tag => `
            <url>
              <loc>${baseUrl}/tags/${encodeURIComponent(tag)}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>hourly</changefreq>
              <priority>0.8</priority>
            </url>
          `
     )}
   </urlset>
 `;
}

function SiteMap() {}

export const getServerSideProps: GetServerSideProps =
  withAxiomGetServerSideProps(async ({ res, log }) => {
    let slugs: GenerateSiteMapParams['slugs'] = [
      {
        slug: null,
        lang: '',
        updated: new Date()
      }
    ];
    let users: GenerateSiteMapParams['users'] = [
      {
        name: null,
        updated: null
      }
    ];
    let tags: GenerateSiteMapParams['tags'] = [''];

    try {
      const tagsQuery = sitemapServices.getAllTags();
      const slugsQuery = sitemapServices.getAllSnippetSlugs();
      const usersQuery = sitemapServices.getAllUsernames();

      const results = await Promise.all([tagsQuery, slugsQuery, usersQuery]);

      tags = results[0];
      slugs = results[1];
      users = results[2];
    } catch (err) {
      log.error('Error while fetching data for sitemap.xml', { err });
    }
    const sitemap = generateSiteMap({ tags, slugs, users });

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=6000, stale-while-revalidate=120'
    );
    res.write(sitemap);
    res.end();

    return {
      props: {}
    };
  });

export default SiteMap;
