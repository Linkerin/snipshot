import prisma from '../prisma';

async function getNumberOfComments(snippetId: string) {
  try {
    const number = await prisma.comment.count({
      where: { snippetId: { equals: snippetId } }
    });

    return number;
  } catch (err) {
    throw err;
  }
}

export default getNumberOfComments;
