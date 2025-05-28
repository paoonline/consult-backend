import { emailValue } from "../domain/email.vo";
import { LoginEntity } from "../domain/login.entity";

export const createFactory = (emailId: string): LoginEntity => {
    return new LoginEntity(
      new emailValue(emailId)
    );
  }