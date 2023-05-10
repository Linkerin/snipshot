import NextLink from 'next/link';
import {
  Heading,
  Highlight,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack
} from '@chakra-ui/react';

import Contents from './Contents';
import Meta from '@/components/Meta/Meta';
import PageContentWrapper from '@/components/PageContentWrapper';

function PrivacyPolicyPage() {
  return (
    <>
      <Meta
        title="Privacy Policy · snipshot"
        description="Privacy Policy of snipshot.dev web application"
        keywords="legal, information, policy, snipshot"
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
            Privacy Policy for snipshot.dev
          </Highlight>
        </Heading>
        <Contents />
        <Text>
          This Privacy Policy governs the manner in which{' '}
          <Link as={NextLink} aria-label="Home page" href="/" fontWeight="bold">
            snipshot.dev
          </Link>{' '}
          website (&#34;we&#34;, &#34;us&#34;, &#34;our&#34;, or &#34;Site&#34;)
          collects, uses, maintains, and discloses information collected from
          users (each, a &#34;User&#34;) of the Site (&#34;Site&#34;). This
          privacy policy applies to the Site and all products and services
          offered by <strong>snipshot.dev</strong>.
        </Text>

        <Heading fontSize="xl" id="personal-info">
          Personal identification information
        </Heading>
        <Text>
          We may collect personal identification information from Users in a
          variety of ways, including, but not limited to, when Users visit our
          Site, register on the Site, fill out a form, and in connection with
          other activities, services, features, or resources we make available
          on our Site. Users may be asked for, as appropriate, name, email
          address, and other contact information. We will collect personal
          identification information from Users only if they voluntarily submit
          such information to us. Users can always refuse to supply personal
          identification information, except that it may prevent them from
          engaging in certain Site-related activities.
        </Text>

        <Heading fontSize="xl" id="non-personal-info">
          Non-personal identification information
        </Heading>
        <Text>
          We may collect non-personal identification information about Users
          whenever they interact with our Site. Non-personal identification
          information may include the browser name, the type of computer or
          device, and technical information about Users&#39; means of connection
          to our Site, such as the operating system and the Internet service
          provider utilised and other similar information.
        </Text>

        <Heading fontSize="xl" id="cookies">
          Web browser cookies
        </Heading>
        <Text>
          Our Site uses &#34;cookies&#34; to enhance User&#39;s experience.
          Users&#39; web browsers place cookies on their hard drive for
          record-keeping purposes and sometimes to track information about them.
          Users may choose to set their web browser to refuse cookies or to
          alert them when cookies are being sent. If they do so, note that some
          parts of the Site may not function properly. You can find more
          information on how to manage cookies in your browser&#39;s help
          section.
        </Text>

        <Heading fontSize="xl" id="info-usage">
          How we use collected information
        </Heading>
        <VStack alignItems="flex-start">
          <Text>
            We may collect and use Users&#39; personal information for the
            following purposes:
          </Text>
          <UnorderedList pl={4}>
            <ListItem>
              <Text>
                To improve customer service: Information you provide helps us
                respond to your customer service requests and support needs more
                efficiently.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                To personalize User&#39;s experience: We may use aggregated
                information to understand how our Users as a group use the
                services and resources provided on our Site.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                To improve our Site: We may use feedback you provide to improve
                our products and services.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                To send periodic emails: We may use the email address to send
                Users information and updates pertaining to their account or to
                respond to their inquiries, questions, and/or other requests.
              </Text>
            </ListItem>
          </UnorderedList>
        </VStack>

        <Heading fontSize="xl" id="info-protection">
          How we protect your information
        </Heading>
        <Text>
          We adopt appropriate data collection, storage, and processing
          practices and security measures to protect against unauthorised
          access, alteration, disclosure, or destruction of your personal
          information, username, password, transaction information, and data
          stored on our Site.
        </Text>

        <Heading fontSize="xl" id="info-sharing">
          Sharing your personal information
        </Heading>
        <Text>
          We do not sell, trade, or rent Users&#39; personal identification
          information to others. We may share generic aggregated demographic
          information not linked to any personal identification information
          regarding visitors and users with our business partners, trusted
          affiliates, and advertisers for the purposes outlined above.
        </Text>

        <Heading fontSize="xl" id="changes">
          Changes to this privacy policy
        </Heading>
        <Text>
          The Site has the discretion to update this privacy policy at any time.
          When we do, we will revise the updated date at the bottom of this
          page. We encourage Users to frequently check this page for any changes
          to stay informed about how we are helping to protect the personal
          information we collect. You acknowledge and agree that it is your
          responsibility to review this privacy policy periodically and become
          aware of modifications.
        </Text>

        <Heading fontSize="xl" id="acceptance">
          Your acceptance of these terms
        </Heading>
        <Text>
          By using this Site, you signify your acceptance of this policy. If you
          do not agree to this policy, please do not use our Site. Your
          continued use of the Site following the posting of changes to this
          policy will be deemed your acceptance of those changes.
        </Text>

        <Heading fontSize="xl" id="ownership">
          Ownership and Disposal of User Content
        </Heading>
        <Text>
          Users of the Site acknowledge and agree that all content posted on the
          Site, including but not limited to code snippets, their attributes,
          comments and other materials, becomes the property of the Site upon
          posting. By posting content on the Site, users grant the Site a
          non-exclusive, transferable, sub-licensable, royalty-free, worldwide
          license to use, reproduce, modify, adapt, publish, translate, create
          derivative works from, distribute, and display such content in any
          media, format, or platform, whether now known or hereafter developed.
          Users also acknowledge and agree that the Site may dispose of such
          content at its discretion, without any obligation to compensate or
          notify the user.
        </Text>

        <Heading fontSize="xl" id="contact-us">
          Contacting us
        </Heading>
        <Text>
          If you have any questions about this Privacy Policy, our{' '}
          <Link
            as={NextLink}
            aria-label="Terms of Service page"
            href="/legal/terms-of-service"
            fontWeight="bold"
          >
            Terms of Service
          </Link>
          , the practices of this Site, or your dealings with this Site, please
          contact us at{' '}
          <Link
            as={NextLink}
            aria-label="Contact e-mail"
            href="mailto:info@snipshot.dev"
            fontWeight="bold"
          >
            info@snipshot.dev
          </Link>
        </Text>

        <Text pt={3} color="text-secondary">
          This document was last updated on <b>April 26, 2023</b>.
        </Text>
      </PageContentWrapper>
    </>
  );
}

export default PrivacyPolicyPage;
