import prisma from '../prisma';

async function getComments(snippetId: string) {
  try {
    const data = await prisma.snippetsComments.findMany({
      where: { snippetId: { equals: snippetId } },
      select: {
        comments: {
          select: {
            id: true,
            comment: true,
            parent: true,
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
          }
        }
      },
      orderBy: {
        comments: { created: 'asc' }
      }
    });
    const comments = data.map(commentObj => {
      const comment = commentObj.comments;
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
