import { UpdateCatDto } from './dto/update-cat.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatEntity } from './entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepository: Repository<CatEntity>,
  ) {}

  findAll() {
    return this.catRepository.find({
      relations: ['adoption'],
      order: { createdAt: { direction: 'ASC' } },
    });
  }

  async findOne(id: string) {
    const cat = await this.catRepository.findOne({
      where: { id: +id },
      relations: ['adoption'],
    });
    if (!cat) {
      throw new Error(`Cat #${id} not found`);
    }
    console.log(cat);
    return cat;
  }

  create(createCatDto: CreateCatDto) {
    // const birth = Date.parse(createCatDto.birth);
    // const tmp = {
    //   ...createCatDto,
    //   birth,
    // };
    const cat = this.catRepository.create(createCatDto);
    return this.catRepository.save(cat);
  }

  async update(id: string, UpdateCatDto: UpdateCatDto) {
    const cat = await this.catRepository.preload({
      id: +id,
      ...UpdateCatDto,
    });
    if (!cat) {
      throw new Error(`Cat #${id} not found`);
    }
    return this.catRepository.save(cat);
  }

  async remove(id: string) {
    const cat = await this.findOne(id);
    return this.catRepository.remove(cat);
  }
}
