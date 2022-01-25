'use strict';

import { generateKeyPair } from 'web-ssh-keygen';
import JSZip from 'jszip';

import config from '../assets/config.ascii';

const generateSSHKeyBlob = (key: string): Blob => {
  return new Blob([key], { type: 'application/x-pem-key' });
};

const generateSSHKey = async (
  size: SizeType,
  hash: HashType,
  comment: string
): Promise<GeneratedKeyPairBlobObj> => {
  const result: GeneratedKeyPairObj = await generateKeyPair({
    alg: 'RSASSA-PKCS1-v1_5',
    size: size,
    hash: hash,
    name: comment,
  });

  const SSHPublicKey = generateSSHKeyBlob(result.publicKey);
  const SSHPrivateKey = generateSSHKeyBlob(result.privateKey);
  const publicKey = result.publicKey;
  return { SSHPublicKey, SSHPrivateKey, publicKey };
};

const generateSSHKeyZip = async (
  size: SizeType,
  hash: HashType,
  comment: string
): Promise<string> => {
  const { SSHPublicKey, SSHPrivateKey, publicKey } = await generateSSHKey(
    size,
    hash,
    comment
  );
  let zip = new JSZip();
  zip.file('id_rsa.pub', SSHPublicKey);
  zip.file('id_rsa', SSHPrivateKey);
  zip.file('config', config);
  zip.generateAsync({ type: 'blob' }).then((blob) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'ssh_key.zip';
    document.body.appendChild(downloadLink); // Required for this to work in FireFox
    downloadLink.click();
    downloadLink.remove();
  });
  return publicKey;
};

export { generateSSHKeyZip };
