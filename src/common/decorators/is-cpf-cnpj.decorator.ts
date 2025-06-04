import { registerDecorator, ValidationOptions } from 'class-validator';
import { isCNPJ, isCPF } from 'brazilian-values';

export function IsCpfCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCpfCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isCPF(value) || isCNPJ(value);
        },
        defaultMessage(): string {
          return 'CPF ou CNPJ inválido';
        },
      },
    });
  };
}