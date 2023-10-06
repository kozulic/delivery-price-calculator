import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Calculator } from './calculator';

@Entity()
export class Tariff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  low: number;

  @Column({ nullable: false })
  high: number;

  @Column({ nullable: false })
  price: number;

  @ManyToOne(() => Calculator, (calculator) => calculator.tariffs)
  calculator: Calculator;

  @Column()
  calculatorId: number;
}
