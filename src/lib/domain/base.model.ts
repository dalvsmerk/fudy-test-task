import { validate } from 'class-validator';
import { ValidationError } from 'lib/errors/validation.error';

export abstract class BaseModel {
  async validate() {
    const errors = await validate(this);

    if (errors.length > 0) {
      throw new ValidationError(this.constructor.name, errors);
    }
  }
}
