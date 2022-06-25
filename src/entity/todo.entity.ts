import { EntityModel } from '@midwayjs/orm';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@EntityModel("todo")
export class TodoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("int")
    status: number;

    @Column("int")
    priority: number;

    @CreateDateColumn({
      name: 'created_time'
    })
    createdTime: Date;

    @UpdateDateColumn({
      name: 'updated_time'
    })
    updatedTime: Date;
  }