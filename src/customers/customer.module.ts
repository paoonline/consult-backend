import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { Module } from '@nestjs/common';
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { JwtStrategy } from "src/validate/jwt.strategy";
import { UserModule } from "src/user/user.module";


@Module({
  imports: [TypeOrmModule.forFeature([Customer]), UserModule],
  controllers: [CustomerController],
  providers: [CustomerService, JwtStrategy],
  exports: [CustomerService],
})
export class CustomerModule {}
