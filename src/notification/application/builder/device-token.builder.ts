import { PlatformType, Prisma } from '@prisma/client';
import { DeviceTokenEntity } from 'src/notification/domain/entities/device-token.entity';

export class DeviceTokenBuilder {
  private data: Partial<Prisma.DeviceTokenUncheckedCreateInput> = {};

  setToken(token: string) {
    if (!token) throw new Error('token is required');
    this.data.token = token;
    return this;
  }

  setPlatform(platform: PlatformType) {
    if (!platform) throw new Error('platform is required');
    this.data.platform = platform;
    return this;
  }

  setCustomerId(id: string) {
    if (!id) throw new Error('customerId is required');
    this.data.customer_id = id;
    return this;
  }

  setExpiresAt(date: Date = new Date(Date.now() + 2 * 60 * 60 * 1000)) {
    this.data.expires_at = date;
    return this;
  }

  build(): DeviceTokenEntity {
    return new DeviceTokenEntity(
      this.data.token ?? '',
      this.data.platform!,
      this.data.customer_id!,
      this.data.created_at ?? new Date(),
      this.data.expires_at as Date,
      this.data.active ?? true,
    );
  }
}
