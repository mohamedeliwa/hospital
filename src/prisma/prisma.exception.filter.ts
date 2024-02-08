import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

function exceptionMessage(message: string): string {
  const shortMessage = message.substring(message.indexOf('→'));
  return shortMessage
    .substring(shortMessage.indexOf('\n'))
    .replace(/\n/g, '')
    .trim();
}

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse();
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      message: exceptionMessage(exception.message),
    });
  }
}
