import prisma from './prisma';

export async function getAllTags() {
  const tags = await prisma.snippet.findMany({
    distinct: ['tags'],
    select: { tags: true }
  });
  const uniqueTags = new Set(tags.map(tagObj => tagObj.tags).flat());

  return new Array(...uniqueTags);
}

export async function getAllSnippetSlugs() {
  const slugs = await prisma.snippet.findMany({
    distinct: ['slug'],
    select: { slug: true, lang: true, updated: true }
  });

  return slugs;
}

export async function getAllUsernames() {
  const usernames = await prisma.user.findMany({
    select: { name: true, updated: true }
  });

  return usernames;
}

const sitemapServices = { getAllSnippetSlugs, getAllTags, getAllUsernames };

export default sitemapServices;
