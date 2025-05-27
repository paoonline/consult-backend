import { emailValue } from "./email.vo";

export class LoginEntity {
    constructor(
      public readonly emailId: emailValue,
    ) {
     
    }
    getEmail(): string {
      return this.emailId.getValue();
    }
  }

