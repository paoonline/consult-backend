import { validateData } from "./data.vo";

export class CustomerEntity {
    constructor(
        private readonly data: validateData,
    ) {
     
    }
    getRawPassword(): string {
        return this.data.getValue().password;
     }

    getData() {
        return this.data.getValue()
    }

    getSkills() {
        return this.data.getValue().skills
    }
    
  }

