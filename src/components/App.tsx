'use strict';

import React, { useState, useRef } from 'react';

import { Box, Button, Center, Link, Text } from '@chakra-ui/react';
import { FaKey } from 'react-icons/fa';

import { generateSSHKeyZip } from '../lib/SSHKeyGen';

import { generateForm, generateFooter } from './Form';

const App = () => {
  const [size, setSize] = useState<SizeType>(2048);
  const [hash, setHash] = useState<HashType>('SHA-256');
  const [comment, setComment] = useState<string>('');
  const processing = useRef(false);

  const stateObj = {
    sizeObj: { size, setSize },
    hashObj: { hash, setHash },
    commentObj: { comment, setComment },
  };

  const keyGenerate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (processing.current) return;

    processing.current = true;

    setTimeout(() => {
      processing.current = false;
    }, 10000);
    await generateSSHKeyZip(size, hash, comment);
  };

  return (
    <Center h="100%" flexDirection="column">
      <Box borderWidth="2px" borderRadius="lg" maxW="40vw" minW="20vw" w="40vw">
        <Center
          bg="gold"
          h="6vh"
          fontWeight="bold"
          borderTopLeftRadius="lg"
          borderTopRightRadius="lg"
          mb={4}>
          SSHKeyGen on Web
        </Center>
        {generateForm(stateObj)}
        <Button
          leftIcon={<FaKey />}
          colorScheme="yellow"
          variant="solid"
          width="100%"
          mt={4}
          onClick={keyGenerate}>
          生成
        </Button>
      </Box>
      {generateFooter()}
    </Center>
  );
};

export default App;
