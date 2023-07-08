import { hashPassword, verifyPassword } from '../passwords';

describe('libs/tools/passwords', () => {
  const password = 'SuP3R(omP1ic2te_';

  it('should hash and verify password', async () => {
    const hash = await hashPassword(password);

    expect(await verifyPassword(password, hash)).toBeTruthy();
  });

  it('should not generate same hash two times', async () => {
    const hash1 = await hashPassword(password);
    const hash2 = await hashPassword(password);

    expect(hash1).not.toEqual(hash2);
  });
});
