import { LoginInput } from '../application/dto/login.input';

export class LoginEntity {
  constructor(private readonly data: LoginInput) {
    if (!data.login_date) {
      this.data.login_date = new Date(); // ✅ set default here
    }
  }

  private getEmail(): string {
    return this.data.email_id;
  }

  private getLoginDate(): Date {
    return this.data.login_date;
  }

  isDuplicateOf(other: LoginEntity): boolean {
    if (this.getEmail() !== other.getEmail()) return false;
    const dateA = this.getLoginDate();
    const dateB = other.getLoginDate();
    if (!dateA || !dateB) return false;

    const diff = Math.abs(dateA.getTime() - dateB.getTime());
    const oneMinute = 60 * 1000;

    return diff < oneMinute;
  }

  getData(): LoginInput {
    return this.data;
  }
}
