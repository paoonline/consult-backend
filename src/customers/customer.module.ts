import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { Module } from '@nestjs/common';
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { JwtStrategy } from "src/validate/jwt.strategy";
import { UserModule } from "src/user/user.module";
import { S3Service } from "src/services/s3.service";


@Module({
  imports: [TypeOrmModule.forFeature([Customer]), UserModule],
  controllers: [CustomerController],
  providers: [CustomerService, JwtStrategy, S3Service],
  exports: [CustomerService],
})
export class CustomerModule {}
