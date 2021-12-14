import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "timestamp", nullable: true })
  created: Date;
}
