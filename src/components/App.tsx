'use strict';

import React, { useState, useRef } from 'react';

import { Box, Button, Center, FormLabel, Input, Stack } from '@chakra-ui/react';

import { IconContext } from 'react-icons';
import { FaKey } from 'react-icons/fa';
import { HiClipboardCopy } from 'react-icons/hi';

import { generateSSHKeyZip } from '../lib/SSHKeyGen';

import { generateForm, generateFooter } from './Form';

const clipBoardColor = '#ECC94B';
const clipBoardHoveredColor = '#D69E2E';

const App = () => {
  const [size, setSize] = useState<SizeType>(2048);
  const [hash, setHash] = useState<HashType>('SHA-256');
  const [comment, setComment] = useState<string>('');
  const [publicKey, setPublicKey] = useState<string>('');
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
    const result: string = await generateSSHKeyZip(size, hash, comment);
    setPublicKey(result);
  };

  const copyPublicKeyToClipboard = () => {
    navigator.clipboard.writeText(publicKey);
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
        <Center mt={4} mb={4}>
          <Stack w="22vw">
            <FormLabel htmlFor="publicKey" fontWeight="bold">
              公開鍵
            </FormLabel>
            <Stack w="100%" direction="row">
              <Input
                id="publicKey"
                type="text"
                value={publicKey}
                readOnly={true}
                disabled={!publicKey.length}
              />
              {publicKey.length ? (
                <IconContext.Provider
                  value={{ color: clipBoardColor, size: '40px' }}>
                  <HiClipboardCopy
                    onMouseOver={({ currentTarget }) =>
                      (currentTarget.style.color = clipBoardHoveredColor)
                    }
                    onMouseOut={({ currentTarget }) =>
                      (currentTarget.style.color = clipBoardColor)
                    }
                    onClick={copyPublicKeyToClipboard}
                  />
                </IconContext.Provider>
              ) : null}
            </Stack>
          </Stack>
        </Center>
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
