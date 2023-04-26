import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Link,
  ListItem,
  OrderedList
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
          <OrderedList pl={2} spacing={1.5}>
            <ListItem>
              <Link href="#application-use">Use of the Application</Link>
            </ListItem>
            <ListItem>
              <Link href="#user-content">User Content</Link>
            </ListItem>
            <ListItem>
              <Link href="#property">Intellectual Property</Link>
            </ListItem>
            <ListItem>
              <Link href="#links">
                Links to Third-Party Websites or Resources
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#warranties">Disclaimer of Warranties</Link>
            </ListItem>
            <ListItem>
              <Link href="#liabilities">Limitation of Liability</Link>
            </ListItem>
            <ListItem>
              <Link href="#indemnification">Indemnification</Link>
            </ListItem>
            <ListItem>
              <Link href="#services-modification">
                Modification or Termination of Services
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#termination">Termination</Link>
            </ListItem>
            <ListItem>
              <Link href="#miscellaneous">Miscellaneous</Link>
            </ListItem>
            <ListItem>
              <Link href="#contact-us">Contacting us</Link>
            </ListItem>
          </OrderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default Contents;
