import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { resolveMx } from 'dns';
import * as nodemailer from 'nodemailer';

@ValidatorConstraint({ async: true })
class IsValidEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    return new Promise<boolean>((resolve, reject) => {
      if (!email) {
        return resolve(false);
      }

      const domain = email.split('@')[1];

      resolveMx(domain, (err, addresses) => {
        if (err || addresses.length === 0) {
          return resolve(false);
        }

        const transporter = nodemailer.createTransport({
          host: addresses[0].exchange,
          port: 25,
          secure: false,
          tls: {
            rejectUnauthorized: false,
          },
        });

        transporter.verify((error, success) => {
          if (error) {
            return resolve(false);
          } else {
            return resolve(true);
          }
        });
      });
    });
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email ($value) is not valid!';
  }
}

function IsValidEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidEmailConstraint,
    });
  };
}

export { IsValidEmail };
