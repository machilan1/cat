import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CatEntity } from '../cats/entities/cat.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AdoptionEntity {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String })
  @Column()
  adoptorName: string;

  @ApiProperty({ type: String })
  @Column()
  adoptorLocation: string;

  @ApiProperty({ type: String })
  @Column()
  adoptorPhone: string;

  @ApiProperty({ type: String, name: 'adoptor_email' })
  @Column()
  adoptorEmail: string;

  @Column({ nullable: true, name: 'cat_id' })
  catId: number;
  @OneToOne(() => CatEntity)
  @JoinColumn({
    name: 'cat_id',
  })
  cat: CatEntity;

  @ApiProperty({ type: Date })
  @CreateDateColumn()
  createTime: Date;
}
