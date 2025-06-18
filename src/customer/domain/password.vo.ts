export class validatePassword {
  constructor(private readonly password: string) {
    if (!password || password.length < 6) {
      throw new Error('Invalid password');
    }
  }

  getValue() {
    return this.password;
  }
}
