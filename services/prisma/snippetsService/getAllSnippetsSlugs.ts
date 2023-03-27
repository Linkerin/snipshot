import prisma from '../prisma';

async function getAllSnippetsSlugs() {
  const slugs = await prisma.snippet.findMany({
    select: { slug: true, lang: true }
  });

  return slugs;
}

export default getAllSnippetsSlugs;
