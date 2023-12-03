import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptionEntity } from './adoption.entity';
import { AdoptionController } from './adoption.controller';
import { AdoptionService } from './adoption.service';
import { CatEntity } from '../cats/entities/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdoptionEntity, CatEntity])],
  controllers: [AdoptionController],
  providers: [AdoptionService],
})
export class AdoptionModule {}
