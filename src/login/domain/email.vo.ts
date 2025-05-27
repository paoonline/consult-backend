export class emailValue {
    constructor(private readonly value: string) {
      if (!value) throw new Error('Invalid email');
    }
  
    getValue() {
      return this.value;
    }
  }