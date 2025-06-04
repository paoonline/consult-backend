import { validateData } from "./data.vo";

export class Email {
    constructor(private readonly value: string) {
      if (!value || !this.validate(value)) {
        throw new Error('Invalid email address');
      }
    }
  
    private validate(email: string): boolean {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    getValue(): string {
      return this.value;
    }
  }
export class CustomerEntity {
    constructor(
        private readonly data: validateData,
    ) {
     
    }


    getRawPassword(): string {
        this.data.getValue().email
        return this.data.getValue().password;
     }

    getData() {
        return this.data.getValue()
    }

    getSkills() {
        return this.data.getValue().skills
    }
    
  }

