import { NotFoundException } from '@nestjs/common';
import { PlatformType, Prisma } from '@prisma/client';

// domain/entities/device-token.entity.ts
export class DeviceTokenEntity {
  constructor(
    public readonly token: string,
    public readonly platform: PlatformType,
    public readonly customerId: string,
    public readonly createdAt: Date | string,
    public readonly expiresAt: Date | string,
    public readonly active: boolean = true,
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.isCreatedAtThanDateNow()) {
      throw new NotFoundException('CreateAt than Date Now');
    }
  }

  private isCreatedAtThanDateNow(): boolean {
    const expiresAt = new Date(this.createdAt);
    return expiresAt > new Date();
  }

  static fromPrisma(
    model: Prisma.DeviceTokenUncheckedCreateInput,
  ): DeviceTokenEntity {
    return new DeviceTokenEntity(
      model.token,
      model.platform,
      model.customer_id,
      model.created_at ?? new Date(),
      model.expires_at,
      model.active,
    );
  }

  toPrisma(): Prisma.DeviceTokenUncheckedCreateInput {
    return {
      token: this.token,
      platform: this.platform,
      customer_id: this.customerId,
      created_at: this.createdAt,
      expires_at: this.expiresAt,
      active: this.active,
    };
  }
}
