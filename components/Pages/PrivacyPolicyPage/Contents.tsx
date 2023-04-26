import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Link,
  ListItem,
  UnorderedList
} from '@chakra-ui/react';

function Contents() {
  return (
    <Accordion w="100%" allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Heading fontSize="xl">Contents</Heading>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <UnorderedList pl={2}>
            <ListItem>
              <Link href="#personal-info">
                Personal identification information
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#non-personal-info">
                Non-personal identification information
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#cookies">Web browser cookies</Link>
            </ListItem>
            <ListItem>
              <Link href="#info-usage">How we use collected information</Link>
            </ListItem>
            <ListItem>
              <Link href="#info-protection">
                How we protect your information
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#info-sharing">
                Sharing your personal information
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#changes">Changes to this privacy policy</Link>
            </ListItem>
            <ListItem>
              <Link href="#acceptance">Your acceptance of these terms</Link>
            </ListItem>
            <ListItem>
              <Link href="#ownership">
                Ownership and Disposal of User Content
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#contact-us">Contacting us</Link>
            </ListItem>
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default Contents;
