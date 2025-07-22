import { PlatformType } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';

export class DeviceTokenDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  platform: PlatformType;

  @IsNotEmpty()
  customerId: string;
}

export type DeviceTokenInput = Omit<
  DeviceTokenDto,
  keyof ValidationMetadata
> & { active: boolean };
