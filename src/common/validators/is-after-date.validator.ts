import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsAfterDate', async: false })
export class IsAfterDateConstraint implements ValidatorConstraintInterface {
  validate(finishDate: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const startDate = (args.object as any)[relatedPropertyName];

    if (!finishDate || !startDate) {
      return false; // Si alguna de las fechas es nula o indefinida, es inválida
    }

    return new Date(finishDate) > new Date(startDate); // Verifica que la fecha final sea posterior a la inicial
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `La fecha de finalización debe ser posterior a la fecha de inicio (${relatedPropertyName})`;
  }
}

export function IsAfterDate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsAfterDateConstraint,
    });
  };
}
