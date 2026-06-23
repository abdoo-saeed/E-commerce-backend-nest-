import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class SanitizeUsernamePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'string')
      throw new BadRequestException(
        'Useranme must be a valid non-empty string',
      );

    return value.trim().toLowerCase();
  }
}
