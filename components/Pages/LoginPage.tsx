import { SyntheticEvent, useCallback, useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  Highlight,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

import CustomSpinner from '@/components/Common/CustomSpinner';
import GithubIcon from '@/components/Icons/GithubIcon';
import LegalDisclaimer from '@/components/Common/LegalDisclaimer';
import Meta from '@/components/Meta/Meta';
import useAuth from '@/hooks/useAuth';

function LoginPage() {
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const user = useAuth(true);
  const authErrorToast = useToast();

  const handeGitHubLogin = useCallback(
    async (e: SyntheticEvent) => {
      setIsAuthorizing(true);
      const supabase = (await import('@/services/supabase/supabase')).default;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: '/' }
      });

      if (error) {
        authErrorToast({
          description: 'GitHub authorization failed. Please, try again',
          status: 'error',
          duration: 2000
        });
        setIsAuthorizing(false);

        return;
      }
    },
    [authErrorToast]
  );

  return (
    <>
      <Meta
        title="Login &#183; snipshot"
        keywords="login, snipshot"
        description="User login page for snipshot"
      />
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={10}
        h="100%"
        w={{
          base: '90%',
          sm: '80%',
          md: '65%',
          lg: '50%',
          xl: '40%'
        }}
        mx="auto"
      >
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

        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          {user?.id ? (
            <CustomSpinner />
          ) : (
            <Button
              leftIcon={<GithubIcon boxSize={8} />}
              size="lg"
              onClick={handeGitHubLogin}
              isLoading={isAuthorizing}
              loadingText="Logging in with GitHub..."
              variant="outline"
              colorScheme="gray"
              w="100%"
            >
              Continue with GitHub
            </Button>
          )}
          <LegalDisclaimer
            actionText="signing in"
            color="text-secondary"
            fontSize="xs"
            lineHeight="short"
            textAlign="center"
          />
        </Flex>
      </Flex>
    </>
  );
}

export default LoginPage;
