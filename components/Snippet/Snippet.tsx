import SnippetCard from './SnippetCard';
import SnippetCode from './SnippetCode';
import { SnippetType } from '@/services/types';

export interface SnippetProps {
  snippet: SnippetType;
  provideRef?: React.RefObject<HTMLElement>;
}

function Snippet({ snippet, provideRef }: SnippetProps) {
  const snippetContent = snippet.tree ? snippet.tree : snippet.snippet;
  return (
    <article ref={provideRef}>
      <SnippetCard
        title={snippet.title}
        snippet={snippetContent}
        source={snippet.snippet}
        slug={snippet.slug}
        lang={snippet.lang}
        tags={snippet.tags}
      >
        <SnippetCode snippetTree={!!snippet.tree} />
      </SnippetCard>
      {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap-reverse"
          mt={0.5}
        >
          <Rating id={snippet.rating.id} rating={snippet.rating.rating} />
          {snippet.verified && (
            <Chip
              variant="outlined"
              color="primary"
              label="Verified"
              size="small"
              icon={<CheckCircleOutlineRoundedIcon />}
              sx={{ mr: 1 }}
            />
          )}
        </Stack> */}
      {/* <Stack direction="row" spacing={1} ml={1}>
          <Typography
            color="text.secondary"
            fontSize="small"
            fontWeight={
              snippet.author?.name ? 'fontWeightBold' : 'fontWeightRegular'
            }
          >
            {snippet.author?.name ? (
              <Link
                href={`/users/${snippet.author?.name}`}
                sx={{ ':hover': { color: 'primary.main' } }}
                noLinkStyle
              >
                {snippet.author?.name}
              </Link>
            ) : (
              'anonymous'
            )}
          </Typography>
          <Typography
            color="text.secondary"
            fontSize="small"
            sx={{ cursor: 'default' }}
          >
            {parseDate(snippet.created) ?? ''}
          </Typography>
        </Stack> */}
    </article>
  );
}

export default Snippet;
