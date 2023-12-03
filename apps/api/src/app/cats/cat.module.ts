import { Module } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './entities/cat.entity';
import { CatService } from './cat.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  controllers: [CatsController],
  providers: [CatService],
})
export class CatModule {}
