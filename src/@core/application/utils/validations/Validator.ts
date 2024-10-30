import { ErrorHandler } from '../../../domain/entities/ErrorHandler';

export class Validator {
  static requiredFields(fields: Fields, input: any) {
    const { requireUser } = fields;
    if (requireUser && !input.decodedToken?.userId) {
      throw new ErrorHandler(
        'Validation failed. Please ensure you are logged.',
      );
    }

    for (const fieldName in fields.fields) {
      const param = fields.fields[fieldName];

      if (
        param.required &&
        (input[fieldName] === undefined ||
          input[fieldName] === null ||
          input[fieldName] === '')
      ) {
        throw new ErrorHandler(
          `Validation failed. Please specify data for ${fieldName}.`,
          400,
          142,
        );
      }
    }
  }
}

type FieldConfig = {
  required?: boolean;
};

type NestedFields = {
  [fieldName: string]: FieldConfig;
};

type Fields = {
  requireUser: boolean;
  fields: NestedFields;
};

/** {
          errors: {
            code: 142,
            error: `Validation failed. Please specify data for ${fieldName}.`
          }
        }; */
