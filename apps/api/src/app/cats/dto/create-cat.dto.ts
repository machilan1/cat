import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({ type: String })
  @IsString()
  readonly name: string;

  @ApiProperty({ type: String })
  @IsString()
  readonly birth: string;

  @ApiProperty({ type: String })
  @IsString()
  readonly description: string;

  @ApiProperty({ type: String })
  @IsString()
  readonly location: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  readonly avatar: string[];
}
