import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tariff } from './tariff';

@Entity()
export class Calculator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  basePrice: number;

  @Column({ nullable: false })
  additionalPackagePrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Tariff, (tariff) => tariff.calculator, {
    cascade: ['insert', 'update', 'remove'],
  })
  tariffs: Tariff[];
}
