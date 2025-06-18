export class LoginEntity {
  constructor(private readonly emailId: string) {}
  getEmail(): string {
    return this.emailId;
  }
}
