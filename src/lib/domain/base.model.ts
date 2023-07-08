import { validate } from 'class-validator';

export abstract class BaseModel {
  async validate() {
    const errors = await validate(this);

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
  }
}
