import { Body, Controller, Post } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { AdoptionService } from './adoption.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdoptionEntity } from './adoption.entity';
import { CatEntity } from '../cats/entities/cat.entity';

@ApiTags('adoption')
@Controller('adoption')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CatEntity,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateAdoptionDto })
  create(@Body() createAdoptionDto: CreateAdoptionDto) {
    return this.adoptionService.create(createAdoptionDto);
  }
}
