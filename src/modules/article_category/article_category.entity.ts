// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArticleCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  enable: boolean;

  @Column()
  pid: number;
}