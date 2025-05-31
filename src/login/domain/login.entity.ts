import { emailValue } from "./email.vo";

export class LoginEntity {
    constructor(
      private readonly emailId: emailValue,
    ) {
     
    }
    getEmail(): string {
      return this.emailId.getValue();
    }
  }

