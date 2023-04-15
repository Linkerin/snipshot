import { GetServerSideProps } from 'next';
import { withAxiomGetServerSideProps } from 'next-axiom';

import { cleanObjDataTypesForNextJS } from '@/services/utils';
import getByUser from '@/services/prisma/snippetsService/getByUser';
import { parseDate } from '@/services/date';
import { SnippetType } from '@/services/types';
import supabase from '@/services/supabase/supabase';
import UserPage from '@/components/Pages/UserPage';

export interface UserPageProps {
  snippetsData: SnippetType[];
  registered?: string;
  avatar?: string;
  username?: string;
}

function User({ avatar, registered, username, snippetsData }: UserPageProps) {
  return (
    <UserPage
      avatar={avatar}
      registered={registered}
      username={username}
      snippetsData={snippetsData}
    />
  );
}

export const getServerSideProps: GetServerSideProps =
  withAxiomGetServerSideProps(async ({ req, res, params, log }) => {
    const device = {
      type: req.headers['x-device-type'] ?? '',
      model: req.headers['x-device-model'] ?? ''
    };

    try {
      const username = params?.user;
      if (!username || username instanceof Array)
        throw new Error('Invalid username value');

      const snippetsReq = getByUser({ username });

      const { data, error } = await supabase
        .from('profiles')
        .select('created, avatar')
        .eq('name', username)
        .limit(1)
        .single();
      if (error) throw error;

      const registered = parseDate(data?.created);

      const snippets = await snippetsReq;
      const snippetsData = snippets.map(snippet =>
        cleanObjDataTypesForNextJS(snippet)
      );

      res.setHeader(
        'Cache-Control',
        'public, s-maxage=300, stale-while-revalidate=59'
      );

      return {
        props: {
          avatar: data.avatar,
          registered,
          username,
          snippetsData,
          device
        }
      };
    } catch (err) {
      log.error('Error while fetching user profile page', { err });

      return {
        props: {
          avatar: '',
          registered: '',
          username: '',
          snippetsData: [],
          device
        }
      };
    }
  });

export default User;
