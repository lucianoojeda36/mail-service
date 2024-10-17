import { IsString, IsObject } from 'class-validator';

export class SendEmailDto {
  @IsString()
  to: string;

  @IsString()
  template: string;

  @IsObject()
  context: Record<string, any>;
}
