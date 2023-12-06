import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AdoptionEntity } from '../../adoption/adoption.entity';

@Entity()
export class CatEntity {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String })
  @Column()
  name: string;

  @ApiProperty({ type: String })
  @Column()
  birth: string;

  @ApiProperty({ type: String })
  @Column()
  description: string;

  @ApiProperty({ type: String })
  @Column()
  location: string;

  @ApiProperty({ type: [String] })
  @Column('json', { nullable: true })
  avatar: string[];

  // Todo find a way to anotate this in swagger
  @Column({ nullable: true ,select:false})
  adoptionId: number;
  @OneToOne(() => AdoptionEntity)
  @JoinColumn()
  adoption: AdoptionEntity;
}
