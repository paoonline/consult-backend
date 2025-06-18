export class validateSkills {
  constructor(private readonly skills: string[]) {
    if (!skills || !Array.isArray(skills)) {
      throw new Error('Invalid skills');
    }
  }

  getValue() {
    return this.skills;
  }
}
