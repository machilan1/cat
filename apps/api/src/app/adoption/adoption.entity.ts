import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
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

  @ApiProperty({ type: Date })
  @CreateDateColumn()
  createTime: Date;
}
