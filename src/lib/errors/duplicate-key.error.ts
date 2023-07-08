export class DuplicateKeyError extends Error {
  constructor(key: string) {
    super('Duplicate key error: ' + key);
  }
}
