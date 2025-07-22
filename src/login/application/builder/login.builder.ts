import { LoginEntity } from 'src/login/domain/login.entity';
import { LoginInput } from '../dto/login.input';

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

  build(): LoginEntity {
    if (!this.data.email_id) {
      throw new Error('Missing required login fields');
    }
    return new LoginEntity({
      email_id: this.data.email_id,
      login_date: this.data.login_date,
    });
  }
}
