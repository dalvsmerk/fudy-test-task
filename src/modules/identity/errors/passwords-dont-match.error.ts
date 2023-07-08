export class PasswordsDontMatchError extends Error {
  constructor() {
    super("Passwords don't match");
  }
}
