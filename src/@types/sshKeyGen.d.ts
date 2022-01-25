declare type SizeType = 1024 | 2048 | 4096;
declare type HashType = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

declare type GeneratedKeyPairObj = {
  publicKey: string;
  privateKey: string;
};

declare type GeneratedKeyPairBlobObj = {
  SSHPublicKey: Blob;
  SSHPrivateKey: Blob;
  publicKey: string;
};
