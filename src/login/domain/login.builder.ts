import { LoginInput } from './login.entity';

export class LoginBuilder {
  private data: LoginInput = {
    email_id: '',
    login_date: new Date(),
  };

  setLoginDate(date?: Date | null) {
    this.data.login_date = date ?? new Date();
    return this;
  }

  setEmailId(id?: string) {
    if (!id) throw new Error('id undefined');
    this.data.email_id = id;
    return this;
  }

  build(): LoginInput {
    if (!this.data.email_id) {
      throw new Error('Missing required login fields');
    }
    return this.data; // ควรใช้ type ที่ตรง
  }
}
