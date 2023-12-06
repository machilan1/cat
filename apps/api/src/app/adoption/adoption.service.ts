import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdoptionEntity } from './adoption.entity';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { CatEntity } from '../cats/entities/cat.entity';

@Injectable()
export class AdoptionService {
  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepository: Repository<CatEntity>,
    @InjectRepository(AdoptionEntity)
    private readonly adoptionRepository: Repository<AdoptionEntity>,
  ) {}

  async create(createAdoptionDto: CreateAdoptionDto) {
    // 新增認養紀錄

    let adoption;
    try {
      adoption = await this.adoptionRepository.save(createAdoptionDto);
    } catch (error) {
      console.log(error);
    }

    // 更新貓咪狀態

    try {
      // Toso remove
      const abc = await this.catRepository.save({
        id: createAdoptionDto.catId,
        adoptionId: adoption.id,
      });
      console.log(abc);
    } catch (error) {
      console.log(error);
    }

    return this.catRepository.findOne({
      relations: ['adoption'],
      where: { id: createAdoptionDto.catId },
    });
  }
}
