import { PlatformType, Prisma } from '@prisma/client';

// domain/entities/device-token.entity.ts
export class DeviceTokenEntity {
  constructor(
    public readonly token: string,
    public readonly platform: PlatformType,
    public readonly customerId: string,
    public readonly createdAt?: Date | string,
    public readonly expiresAt?: Date | string,
    public readonly active: boolean = true,
  ) {}

  static fromPrisma(
    model: Prisma.DeviceTokenUncheckedCreateInput,
  ): DeviceTokenEntity {
    return new DeviceTokenEntity(
      model.token,
      model.platform,
      model.customer_id,
      model.created_at,
      model.expires_at,
      model.active,
    );
  }
}
