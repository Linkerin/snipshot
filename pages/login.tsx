import { SyntheticEvent, useState } from 'react';
import { Button, Center, Spinner, useToast } from '@chakra-ui/react';

import GithubIcon from '@/components/Icons/GithubIcon';
import supabase from '@/services/supabase';
import useAuth from '../hooks/useAuth';

function Login() {
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const user = useAuth(true);
  const authErrorToast = useToast();

  const handeGitHubLogin = async (e: SyntheticEvent) => {
    setIsAuthorizing(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: '/' }
    });

    if (error) {
      authErrorToast({
        description: 'GitHub authorization failed. Please, try again',
        status: 'error',
        duration: 2000,
        isClosable: true,
        variant: 'subtle'
      });
      setIsAuthorizing(false);

      return;
    }
  };

  return (
    <Center height="100%">
      {user?.id ? (
        <Spinner thickness="5px" emptyColor="gray.200" size="xl" speed="0.5s" />
      ) : (
        <Button
          leftIcon={<GithubIcon boxSize={8} />}
          size="lg"
          onClick={handeGitHubLogin}
          isLoading={isAuthorizing}
          loadingText="Logging in with GitHub..."
        >
          Continue with GitHub
        </Button>
      )}
    </Center>
  );
}

export default Login;
