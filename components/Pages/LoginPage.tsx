import { SyntheticEvent, useState } from 'react';
import {
  Button,
  Center,
  Spinner,
  Heading,
  Highlight,
  useColorModeValue,
  useToast,
  VStack
} from '@chakra-ui/react';

import GithubIcon from '@/components/Icons/GithubIcon';
import supabase from '@/services/supabase';
import useAuth from '@/hooks/useAuth';

function LoginPage() {
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
    <Center h="80%" flexDirection="column">
      <VStack w={{ base: '75vw', lg: '18vw' }} mb={12} spacing={7}>
        <Heading
          as="p"
          textAlign="left"
          size={{ base: 'md', lg: 'lg' }}
          textColor="primary"
        >
          <Highlight
            query="GitHub"
            styles={{
              px: 3,
              py: 0.5,
              borderRadius: '20px',
              bgColor: useColorModeValue('custom-black', 'custom-white'),
              color: useColorModeValue('custom-white', 'custom-black')
            }}
          >
            We use GitHub as a secure and reliable option for authentication
            process.
          </Highlight>
        </Heading>
        <Heading
          as="p"
          textAlign="right"
          size={{ base: 'sm', lg: 'md' }}
          textColor="text-secondary"
        >
          Do not hesitate to join GitHub community if you don&apos;t have an
          account yet!
        </Heading>
      </VStack>
      {user?.id ? (
        <Spinner
          thickness="5px"
          color="primary"
          emptyColor="gray.200"
          size="xl"
          speed="0.5s"
        />
      ) : (
        <Button
          leftIcon={<GithubIcon boxSize={8} />}
          size="lg"
          onClick={handeGitHubLogin}
          isLoading={isAuthorizing}
          loadingText="Logging in with GitHub..."
          variant="outline"
          colorScheme="gray"
        >
          Continue with GitHub
        </Button>
      )}
    </Center>
  );
}

export default LoginPage;
