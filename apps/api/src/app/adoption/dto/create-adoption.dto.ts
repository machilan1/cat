import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CatEntity } from '../../cats/entities/cat.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdoptionDto {
  @ApiProperty({ type: String })
  @IsString()
  readonly adoptorName: string;

  @ApiProperty({ type: String })
  @IsString()
  readonly adoptorLocation: string;

  @ApiProperty({ type: String })
  @IsString()
  @MinLength(7)
  @MaxLength(10)
  readonly adoptorPhone: string;

  @ApiProperty({ type: String })
  @IsEmail()
  readonly adoptorEmail: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  readonly catId: number;
}
