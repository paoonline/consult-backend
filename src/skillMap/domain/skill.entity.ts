export class SkillEntity {
  private readonly name: string;

  constructor(rawName: string) {
    const normalized = rawName.trim();

    if (!normalized) {
      throw new Error('Skill name is required');
    }

    if (normalized.length > 50) {
      throw new Error('Skill name is too long');
    }

    this.name = normalized;
  }

  getName(): string {
    return this.name;
  }

  getData(): { name: string } {
    return { name: this.name };
  }
}
