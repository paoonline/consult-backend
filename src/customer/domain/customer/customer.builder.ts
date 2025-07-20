import { CustomerType } from '@prisma/client';
import { CustomerInput } from 'src/customer/application/dto/customer';

export class CustomerBuilder {
  private data: Partial<CustomerInput> = {};

  setEmail(email: string): this {
    this.data.email = email;
    return this;
  }

  setPassword(password: string): this {
    this.data.password = password;
    return this;
  }

  setJob(job: string): this {
    this.data.job = job;
    return this;
  }

  setAddress(address: string): this {
    this.data.address = address;
    return this;
  }

  setSkills(skills: string[]): this {
    this.data.skills = skills;
    return this;
  }

  setPhoneNumber(phoneNumber: string): this {
    this.data.phoneNumber = phoneNumber;
    return this;
  }

  setDescription(description: string): this {
    this.data.description = description;
    return this;
  }

  setCustomerType(customerType: CustomerType): this {
    this.data.customerType = customerType;
    return this;
  }

  setProfileImage(profileImage: string): this {
    this.data.profileImage = profileImage;
    return this;
  }

  setPrice(price: number): this {
    this.data.price = price;
    return this;
  }

  build(): CustomerInput {
    const requiredFields: (keyof CustomerInput)[] = [
      'email',
      'password',
      'job',
      'address',
      'skills',
      'phoneNumber',
      'description',
      'customerType',
      'price',
    ];

    for (const field of requiredFields) {
      if (this.data[field] === undefined || this.data[field] === null) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return this.data as CustomerInput;
  }
}
