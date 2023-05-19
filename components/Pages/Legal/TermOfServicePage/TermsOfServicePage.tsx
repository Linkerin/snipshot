import NextLink from 'next/link';
import { Heading, Highlight, Link, Text, VStack } from '@chakra-ui/react';

import Contents from './Contents';
import Meta from '@/components/Meta/Meta';
import PageContentWrapper from '@/components/PageContentWrapper';

function TermsOfServicePage() {
  return (
    <>
      <Meta
        title="Terms of Service · snipshot"
        description="See our Terms of our Service and how they relate to you."
        keywords="legal, information, terms, service, snipshot"
        ogUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/legal/terms-of-service/`}
      />
      <PageContentWrapper
        as={VStack}
        gap={3}
        alignItems="flex-start"
        mx={{ base: 4, lg: 16, '2xl': 20 }}
        pb={4}
      >
        <Heading as="h1">
          <Highlight query="snipshot.dev" styles={{ color: 'primary' }}>
            Terms of Service for snipshot.dev
          </Highlight>
        </Heading>

        <Contents />

        <Text>
          Welcome to snipshot.dev (the &#34;Application&#34;, or the
          &#34;Site&#34;). By accessing or using the Application, you agree to
          be bound by these Terms of Service (&#34;Terms&#34;).
        </Text>

        <Text id="application-use">
          <Highlight
            query="1. Use of the Application."
            styles={{ fontWeight: 'bold', color: 'chakra-body-text' }}
          >
            1. Use of the Application. The Application is a platform for
            developers to store and share useful code snippets in the web. By
            accessing or using the Application, you agree to use the Application
            in accordance with these Terms, all applicable laws, and
            regulations.
          </Highlight>
        </Text>

        <Text id="user-content">
          <Highlight
            query="2. User Content."
            styles={{ fontWeight: 'bold', color: 'chakra-body-text' }}
          >
            2. User Content. You are solely responsible for the content that you
            post or submit to the Application (&#34;User Content&#34;). The User
            Content should be offensive, harmful, malicious, dangerous, or in
            any other way inappropriate. By posting or submitting the User
            Content, you grant the Site a non-exclusive, transferable,
            sub-licensable, royalty-free, worldwide license to use, copy,
            modify, create derivative works based on, distribute, publicly
            display, publicly perform, and otherwise exploit in any manner such
            User Content in all formats and distribution channels now known or
            hereafter devised (including in connection with the Application and
            the Site&#39;s business and on third-party sites and services),
            without further notice to or consent from you, and without the
            requirement of payment to you or any other person or entity.
          </Highlight>
        </Text>

        <Text id="property">
          <Highlight
            query="3. Intellectual Property."
            styles={{ fontWeight: 'bold', color: 'chakra-body-text' }}
          >
            3. Intellectual Property. The Application and its entire contents,
            features, and functionality (including but not limited to all
            information, software, text, displays, images, video, and audio, and
            the design, selection, and arrangement thereof) are owned by the
            Site, its licensors, or other providers of such material and are
            protected by international copyright, trademark, patent, trade
            secret, and other intellectual property or proprietary rights laws.
          </Highlight>
        </Text>

        <Text id="links">
          <Highlight
            query="4. Links to Third-Party Websites or Resources."
            styles={{ fontWeight: 'bold', color: 'chakra-body-text' }}
          >
            4. Links to Third-Party Websites or Resources. The Application may
            contain links to third-party websites or resources. The Site
            provides these links only as a convenience and is not responsible
            for the content, products, or services on or available from those
            websites or resources. You acknowledge sole responsibility and
            assume all risks arising from your use of any third-party websites
            or resources.
          </Highlight>
        </Text>

        <Text id="warranties">
          <Highlight
            query="5. Disclaimer of Warranties."
            styles={{ fontWeight: 'bold', color: 'chakra-body-text' }}
          >
            5. Disclaimer of Warranties. The Application is provided &#34;as
            is&#34; and without warranty of any kind, whether express or
            implied, including, but not limited to, the implied warranties of
            merchantability, fitness for a particular purpose, or
            non-infringement.
          </Highlight>
        </Text>

        <Text id="liabilities">
          <Highlight
            query="6. Limitation of Liability."
            styles={{ fontWeight: 'bold', color: 'chakra-body-text' }}
          >
            6. Limitation of Liability. In no event shall the Application, its
            affiliates, licensors, or service providers be liable for any
            indirect, consequential, punitive, special, or incidental damages,
            including, without limitation, damages for loss of profits, data, or
            other intangibles, arising out of or relating to your use of the
            Application.
          </Highlight>
        </Text>

        <Text id="indemnification">
          <Highlight
            query="7. Indemnification."
            styles={{ fontWeight: 'bold', color: 'chakra-body-text' }}
          >
            7. Indemnification. You agree to indemnify and hold the Site, its
            affiliates, licensors, and service providers harmless from any claim
            or demand, including reasonable attorneys&#39; fees, made by any
            third party due to or arising out of your use of the Application,
            your violation of these Terms, or your violation of any rights of
            another.
          </Highlight>
        </Text>

        <Text id="services-modification">
          <Highlight
            query="8. Modification or Termination of Services."
            styles={{ fontWeight: 'bold', color: 'chakra-body-text' }}
          >
            8. Modification or Termination of Services. The Site reserves the
            right to modify or terminate the Application or any services
            provided through the Application at any time, without notice or
            liability to you. The Site may also modify these Terms at any time,
            and such modifications shall be effective immediately upon posting
            of the modified Terms on the Application. Your continued use of the
            Application after such posting shall be deemed to constitute
            acceptance by you of the modified Terms.
          </Highlight>
        </Text>

        <Text id="termination">
          <Highlight
            query="9. Termination."
            styles={{ fontWeight: 'bold', color: 'chakra-body-text' }}
          >
            9. Termination. The Site may terminate these Terms and your access
            to the Application at any time, for any reason, without notice or
            liability to you.
          </Highlight>
        </Text>

        <Text id="miscellaneous">
          <Highlight
            query="10. Miscellaneous."
            styles={{ fontWeight: 'bold', color: 'chakra-body-text' }}
          >
            10. Miscellaneous. These Terms constitute the entire agreement
            between you and the Site regarding the use of the Application. If
            any provision of these Terms is found to be invalid or
            unenforceable, the remaining provisions shall be enforced to the
            fullest extent possible, and the remaining provisions of the Terms
            shall remain in full force and effect. The failure of The Site to
            enforce any right or provision of these Terms shall not be deemed a
            waiver of such right or provision.
          </Highlight>
        </Text>

        <Text id="contact-us">
          <Highlight
            query="11. Contacting us."
            styles={{ fontWeight: 'bold', color: 'chakra-body-text' }}
          >
            11. Contacting us. If you have any questions about these Terms or
          </Highlight>{' '}
          the Application, please contact us at{' '}
          <Link
            as={NextLink}
            aria-label="Contact e-mail"
            href="mailto:info@snipshot.dev"
            fontWeight="bold"
          >
            info@snipshot.dev
          </Link>
        </Text>

        <Text>
          By using the Application, you acknowledge that you have read,
          understood, and agree to be bound by these Terms and our{' '}
          <Link
            as={NextLink}
            aria-label="Privacy Policy page"
            href="/legal/privacy-policy"
            fontWeight="bold"
          >
            Privacy Policy
          </Link>
          .
        </Text>

        <Text pt={3} color="text-secondary">
          This document was last updated on <b>April 26, 2023</b>.
        </Text>
      </PageContentWrapper>
    </>
  );
}

export default TermsOfServicePage;
