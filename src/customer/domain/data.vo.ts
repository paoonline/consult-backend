import { Prisma } from "@prisma/client";

export class validateData {
    constructor(
          private readonly data: Prisma.CustomerCreateInput,
      ) {
        if (!data) throw new Error('Invalid data');
      }
    
    getValue() {
        return this.data
      }
}