export type LoginInput = {
  email_id: string;
  login_date?: Date;
};

export class LoginEntity {
  constructor(private readonly data: LoginInput) {}

  // private getEmail(): string {
  //   return this.data.email_id;
  // }

  private getLoginDate(): Date | undefined {
    return this.data.login_date;
  }

  isDuplicateOf(other?: Date): boolean {
    const dateA = this.getLoginDate();
    const dateB = other;
    if (!dateA || !dateB) return false;

    const diff = Math.abs(dateA.getTime() - dateB.getTime());
    const oneMinute = 60 * 1000;

    return diff < oneMinute;
  }

  getData(): LoginInput {
    return this.data;
  }
}
