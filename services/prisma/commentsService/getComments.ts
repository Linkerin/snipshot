import prisma from '../prisma';

async function getComments(snippetId: string) {
  try {
    const data = await prisma.comment.findMany({
      where: { snippetId: { equals: snippetId } },
      select: {
        id: true,
        comment: true,
        parent: true,
        snippetId: true,
        created: true,
        updated: true,
        deleted: true,
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      },
      orderBy: {
        created: 'asc'
      }
    });

    const comments = data.map(comment => {
      if (comment.deleted) {
        comment.comment = '';
      }
      return comment;
    });

    return comments;
  } catch (err) {
    throw err;
  }
}

export default getComments;
