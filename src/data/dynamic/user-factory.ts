import { faker } from "@faker-js/faker";

export interface TestUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class UserFactory {

  static generateUser(): TestUser {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 })
    };
  }
}