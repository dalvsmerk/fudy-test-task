export class ValidationError extends Error {
  constructor(modelName: string, errors: unknown[]) {
    const errorText = errors.map((e) => e.toString()).join(', ');

    super(`Validation error of ${modelName}: ${errorText}`);
  }
}
