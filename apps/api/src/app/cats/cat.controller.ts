import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CatEntity } from './entities/cat.entity';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all data successfully',
    type: [CatEntity],
  })
  @ApiOperation({ operationId: 'getAllCats' })
  findAll() {
    return this.catService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Retrieved task by ID successfully',
    type: CatEntity,
  })
  @ApiNotFoundResponse({ description: 'No task found for ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the task',
  })
  findOne(@Param('id') id: string) {
    return this.catService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateCatDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CatEntity,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the task',
  })
  @ApiOkResponse({
    description: 'Update data successfully',

    type: CatEntity,
  })
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(id, updateCatDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the task',
  })
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.catService.remove(id);
  }
}
