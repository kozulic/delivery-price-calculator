import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DeliveryRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  distance: number;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  numberOfPackages: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column('decimal', { nullable: true })
  price: number;

  @CreateDateColumn()
  createdAt: Date;
}
