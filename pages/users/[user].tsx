import { GetStaticProps } from 'next';

import { cleanObjDataTypesForNextJS } from '@/services/utils';
import getByUser from '@/services/prisma/snippetsService/getByUser';
import { parseDate } from '@/services/date';
import { SnippetType } from '@/services/types';
import supabase from '@/services/supabase';
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

export async function getStaticPaths() {
  try {
    const { data, error } = await supabase.from('profiles').select('name');
    if (error) throw error;

    return {
      paths: data.map(element => ({ params: { user: element.name } })),
      fallback: 'blocking'
    };
  } catch (err) {
    console.error('Error while fetching all usernames');
    console.error(err);

    return {
      paths: [],
      fallback: 'blocking'
    };
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
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

    return {
      props: { avatar: data.avatar, registered, username, snippetsData }
    };
  } catch (err) {
    console.warn('Error while fetching user for SSG');
    console.error(err);

    return {
      props: { avatar: '', registered: '', username: '', snippetsData: [] }
    };
  }
};

export default User;
