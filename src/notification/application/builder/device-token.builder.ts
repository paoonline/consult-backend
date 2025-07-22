import { PlatformType, Prisma } from '@prisma/client';

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

  build(): Prisma.DeviceTokenUncheckedCreateInput {
    return this.data as Prisma.DeviceTokenUncheckedCreateInput;
  }
}
