// application/use-cases/register-device-token.use-case.ts

import { PlatformType } from '@prisma/client';
import { DeviceTokenEntity } from 'src/notification/domain/entities/device-token.entity';
import { DeviceTokenRepository } from 'src/notification/infrastructure/device-token.repository';
import { DeviceTokenBuilder } from '../../builder/device-token.builder';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RegisterDeviceTokenUseCase {
  constructor(private readonly deviceTokenRepository: DeviceTokenRepository) {}

  async execute(data: {
    token: string;
    platform: PlatformType;
    customerId: string;
  }): Promise<DeviceTokenEntity> {
    const entity = new DeviceTokenBuilder()
      .setToken(data.token)
      .setCustomerId(data.customerId)
      .setPlatform(data.platform)
      .setExpiresAt()
      .build();

    const existing = await this.deviceTokenRepository.findByDuplicateToken(
      data.token,
    );
    if (existing) {
      throw new NotFoundException('DeviceToken is duplicate');
    }

    return this.deviceTokenRepository.create(entity);
  }
}
