import React from 'react';
import { Box, Divider, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box w={'100%'} >
      <Heading style={{borderTop:'1px solid grey',borderBottom:'1px solid grey', margin:'.8rem',padding:'.2rem'}}  >Cat Clicker App</Heading>
    </Box>
  );
}

export default Navbar;
