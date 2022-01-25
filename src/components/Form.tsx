'use strict';

import React from 'react';

import {
  Box,
  Link,
  Text,
  Center,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react';

const sizeType: SizeType[] = [1024, 2048, 4096];
const hashType: HashType[] = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

const generateSizeRadioButtons = (sizeObj: SizeObj) => {
  const { size, setSize } = sizeObj;
  const sizeTypeItems = sizeType.map((sizeNumber: SizeType) => {
    const sizeName: string = `size-${sizeNumber}`;
    return (
      <Radio key={sizeName} value={sizeNumber}>
        {sizeNumber}
      </Radio>
    );
  });

  return (
    <Stack spacing="5px" alignSelf="flex-start">
      <FormLabel as="legend" fontWeight="bold">
        ビット数
      </FormLabel>
      <RadioGroup
        name="size"
        onChange={(e) => setSize(parseInt(e) as SizeType)}
        value={size}>
        <Stack spacing="10px">{sizeTypeItems}</Stack>
      </RadioGroup>
    </Stack>
  );
};

const generateHashRadioButtons = (hashObj: HashObj) => {
  const { hash, setHash } = hashObj;
  const hashTypeItems = hashType.map((hashType: HashType) => {
    const hashName: string = `hash-${hashType}`;
    return (
      <Radio key={hashName} value={hashType}>
        {hashType}
      </Radio>
    );
  });

  return (
    <Stack spacing="5px">
      <FormLabel as="legend" fontWeight="bold">
        ハッシュ形式
      </FormLabel>
      <RadioGroup
        name="hash"
        onChange={(e) => setHash(e as HashType)}
        value={hash}>
        <Stack spacing="10px">{hashTypeItems}</Stack>
      </RadioGroup>
    </Stack>
  );
};

const generateMailInput = (commentObj: CommentObj) => {
  const { comment, setComment } = commentObj;
  return (
    <Center mt={4} mb={4}>
      <Stack w="22vw">
        <FormLabel htmlFor="email" fontWeight="bold">
          メール
        </FormLabel>
        <Input
          id="email"
          type="email"
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
        />
        <FormHelperText fontSize="xs">※オプション</FormHelperText>
      </Stack>
    </Center>
  );
};

export const generateForm = (stateObj: StateObj) => {
  return (
    <FormControl as="fieldset">
      <Stack spacing="5px" direction="row">
        <Center w="100%" mt={4} mb={4} justifyContent="space-evenly">
          {generateSizeRadioButtons(stateObj.sizeObj)}
          {generateHashRadioButtons(stateObj.hashObj)}
        </Center>
      </Stack>
      {generateMailInput(stateObj.commentObj)}
    </FormControl>
  );
};

export const generateFooter = () => {
  return (
    <Box mt={4}>
      <Text>
        Thank you for{' '}
        <Link
          href="https://github.com/PatrickRoumanoff"
          isExternal
          color="goldenrod"
          fontWeight="bold">
          Patrick Roumanoff
        </Link>{' '}
        and{' '}
        <Link
          href="https://github.com/nwtgck"
          isExternal
          color="goldenrod"
          fontWeight="bold">
          Ryo Ota
        </Link>
      </Text>
      <Text>
        The core of this project was originally created by{' '}
        <Link
          href="https://github.com/PatrickRoumanoff/js-keygen"
          isExternal
          color="goldenrod"
          fontWeight="bold">
          PatrickRoumanoff/js-keygen
        </Link>
      </Text>
      <Text>
        This app use{' '}
        <Link
          href="https://github.com/nwtgck/web-ssh-keygen"
          isExternal
          color="goldenrod"
          fontWeight="bold">
          nwtgck/web-ssh-keygen
        </Link>
      </Text>
    </Box>
  );
};
