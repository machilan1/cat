import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdoptionEntity } from './adoption.entity';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { CatEntity } from '../cats/entities/cat.entity';

@Injectable()
export class AdoptionService {
  constructor(
    @InjectRepository(AdoptionEntity)
    private readonly adoptionRepository: Repository<AdoptionEntity>
  ) {}

  create(createAdoptionDto: CreateAdoptionDto) {
    const adoption = this.adoptionRepository.create(createAdoptionDto);
    return this.adoptionRepository.save(adoption);
  }
}
