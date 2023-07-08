import { scrypt, randomBytes, timingSafeEqual } from 'crypto';

const KEYLENGTH = 32;

// Not using promisify to prevent max callstack issue
export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // It's recommended to have 16-byte salt
    // https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
    const salt = randomBytes(16).toString('hex');

    scrypt(password, salt, KEYLENGTH, (err, derivedKey) => {
      if (err) {
        reject(err);
      }

      resolve(`${salt}.${derivedKey.toString('hex')}`);
    });
  });
}

export function verifyPassword(
  toVerify: string,
  hash: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, hashKey] = hash.split('.');
    const keyBuff = Buffer.from(hashKey, 'hex');

    scrypt(toVerify, salt, KEYLENGTH, (err, derivedKey) => {
      if (err) {
        reject(err);
      }

      resolve(timingSafeEqual(keyBuff, derivedKey));
    });
  });
}
